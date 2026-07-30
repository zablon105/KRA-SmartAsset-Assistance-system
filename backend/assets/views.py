from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError as DRFValidationError

from accounts.permissions import IsICTOfficerOrAdmin
from . import services
from .models import Asset, AssetAssignment, AssetHistory
from .serializers import (
    AssetSerializer,
    AssetAssignmentSerializer,
    AssetHistorySerializer,
    AssignAssetSerializer,
    TransferAssetSerializer,
    ReturnAssetSerializer,
)

User = get_user_model()


class AssetViewSet(viewsets.ModelViewSet):
    """
    CRUD for the asset registry, plus custom actions that go through
    services.py so status changes and history logging always stay in sync.
    """

    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsICTOfficerOrAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["asset_tag", "serial_number", "brand", "model_name", "station"]
    ordering_fields = ["created_at", "asset_tag", "status"]

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get("category")
        status_param = self.request.query_params.get("status")
        if category:
            qs = qs.filter(category=category)
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

    @action(detail=True, methods=["post"])
    def assign(self, request, pk=None):
        asset = self.get_object()
        serializer = AssignAssetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        employee = self._get_employee_or_400(serializer.validated_data["employee_id"])
        try:
            assignment = services.assign_asset(
                asset, employee,
                performed_by=request.user,
                notes=serializer.validated_data.get("notes", ""),
            )
        except DjangoValidationError as e:
            raise DRFValidationError(e.message if hasattr(e, "message") else str(e))

        return Response(AssetAssignmentSerializer(assignment).data, status=201)

    @action(detail=True, methods=["post"])
    def transfer(self, request, pk=None):
        asset = self.get_object()
        serializer = TransferAssetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        employee = self._get_employee_or_400(serializer.validated_data["employee_id"])
        assignment = services.transfer_asset(
            asset, employee,
            performed_by=request.user,
            notes=serializer.validated_data.get("notes", ""),
        )
        return Response(AssetAssignmentSerializer(assignment).data, status=201)

    @action(detail=True, methods=["post"], url_path="return")
    def return_asset(self, request, pk=None):
        asset = self.get_object()
        serializer = ReturnAssetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            assignment = services.return_asset(
                asset, performed_by=request.user,
                notes=serializer.validated_data.get("notes", ""),
            )
        except DjangoValidationError as e:
            raise DRFValidationError(e.message if hasattr(e, "message") else str(e))

        return Response(AssetAssignmentSerializer(assignment).data, status=200)

    @action(detail=True, methods=["get"])
    def history(self, request, pk=None):
        asset = self.get_object()
        qs = asset.history.all()
        return Response(AssetHistorySerializer(qs, many=True).data)

    @action(detail=True, methods=["post"], url_path="discover_specs")
    def discover_specs(self, request, pk=None):
        """Simulates automated network discovery (Intune / SNMP / WMI agent)."""
        asset = self.get_object()
        import random, hashlib
        from django.utils import timezone

        subnet = random.choice(["10.10.25", "10.20.12", "192.168.4"])
        last_octet = random.randint(10, 240)
        asset.ip_address = f"{subnet}.{last_octet}"
        if not asset.mac_address:
            hex_str = hashlib.md5(asset.serial_number.encode()).hexdigest()[:12].upper()
            asset.mac_address = ":".join([hex_str[i:i+2] for i in range(0, 12, 2)])
        if not asset.hostname:
            asset.hostname = f"KRA-LAP-{asset.id:04d}"
        asset.last_seen = timezone.now()

        # Recalculate AI insights
        from .ai_engine import calculate_asset_ai_insights
        ai_res = calculate_asset_ai_insights(asset)
        asset.health_score = ai_res["health_score"]
        asset.risk_score = ai_res["risk_score"]
        asset.ai_recommendations = ai_res["ai_recommendations"]

        asset.save()
        return Response(AssetSerializer(asset).data)

    @action(detail=True, methods=["post"], url_path="ai_evaluate")
    def ai_evaluate(self, request, pk=None):
        """Evaluates AI insights, risk scores, and predictive maintenance for this device."""
        asset = self.get_object()
        from .ai_engine import calculate_asset_ai_insights
        ai_res = calculate_asset_ai_insights(asset)
        asset.health_score = ai_res["health_score"]
        asset.risk_score = ai_res["risk_score"]
        asset.ai_recommendations = ai_res["ai_recommendations"]
        asset.save(update_fields=["health_score", "risk_score", "ai_recommendations"])
        return Response(AssetSerializer(asset).data)

    def _get_employee_or_400(self, employee_id):
        try:
            return User.objects.get(pk=employee_id)
        except User.DoesNotExist:
            raise DRFValidationError({"employee_id": "No user with this id exists."})


class AssetAssignmentViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only: assignments are created via AssetViewSet actions, not directly."""

    queryset = AssetAssignment.objects.all()
    serializer_class = AssetAssignmentSerializer
    permission_classes = [IsICTOfficerOrAdmin]

    def get_queryset(self):
        qs = super().get_queryset()
        employee_id = self.request.query_params.get("employee")
        is_active = self.request.query_params.get("is_active")
        if employee_id:
            qs = qs.filter(employee_id=employee_id)
        if is_active is not None:
            qs = qs.filter(is_active=is_active.lower() == "true")
        return qs


class AssetHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only audit trail."""

    queryset = AssetHistory.objects.all()
    serializer_class = AssetHistorySerializer
    permission_classes = [IsICTOfficerOrAdmin]

    def get_queryset(self):
        qs = super().get_queryset()
        asset_id = self.request.query_params.get("asset")
        if asset_id:
            qs = qs.filter(asset_id=asset_id)
        return qs