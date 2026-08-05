from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError as DRFValidationError

from accounts.permissions import IsICTOfficerOrAdmin
from . import services
from .models import ClearanceRequest, ClearanceItem
from .serializers import (
    ClearanceRequestSerializer,
    ClearanceItemSerializer,
    InitiateClearanceSerializer,
    ReviewClearanceItemSerializer,
)

User = get_user_model()


class ClearanceRequestViewSet(viewsets.ModelViewSet):
    """
    List/retrieve clearance requests, plus a custom create flow that
    auto-populates items from the employee's current assets.
    """

    queryset = ClearanceRequest.objects.all()
    serializer_class = ClearanceRequestSerializer
    permission_classes = [IsICTOfficerOrAdmin]
    http_method_names = ["get", "post", "head", "options"]  # no raw PUT/PATCH/DELETE

    def get_queryset(self):
        qs = super().get_queryset()
        employee_id = self.request.query_params.get("employee")
        status_param = self.request.query_params.get("status")
        if employee_id:
            qs = qs.filter(employee_id=employee_id)
        if status_param:
            qs = qs.filter(status=status_param)
        return qs

    def create(self, request, *args, **kwargs):
        serializer = InitiateClearanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            employee = User.objects.get(pk=serializer.validated_data["employee_id"])
        except User.DoesNotExist:
            raise DRFValidationError({"employee_id": "No user with this id exists."})

        clearance = services.initiate_clearance(
            employee, serializer.validated_data["reason"], initiated_by=request.user
        )
        return Response(ClearanceRequestSerializer(clearance).data, status=201)

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        clearance = self.get_object()
        notes = request.data.get("notes", "")
        clearance = services.reject_clearance(clearance, performed_by=request.user, notes=notes)
        return Response(ClearanceRequestSerializer(clearance).data)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def verify_certificate(self, request):
        """
        Verify certificate authenticity. Requires authentication.
        (Can be made public with rate limiting if external verification is needed)
        """
        cert_id = request.query_params.get("cert_id") or request.query_params.get("certificate_id")
        if not cert_id:
            return Response({"valid": False, "message": "Please provide a valid certificate ID."}, status=400)
        
        clearance = ClearanceRequest.objects.filter(certificate_id__iexact=cert_id.strip()).first()
        if not clearance:
            return Response({"valid": False, "message": "Certificate ID not found in KRA SmartAsset AI registry."}, status=404)

        return Response({
            "valid": True,
            "certificate": ClearanceRequestSerializer(clearance).data
        })


class ClearanceItemViewSet(viewsets.ReadOnlyModelViewSet):
    """Read items, plus the custom review action to approve/reject one."""

    queryset = ClearanceItem.objects.all()
    serializer_class = ClearanceItemSerializer
    permission_classes = [IsICTOfficerOrAdmin]

    def get_queryset(self):
        qs = super().get_queryset()
        request_id = self.request.query_params.get("clearance_request")
        if request_id:
            qs = qs.filter(clearance_request_id=request_id)
        return qs

    @action(detail=True, methods=["post"])
    def review(self, request, pk=None):
        item = self.get_object()
        serializer = ReviewClearanceItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            item = services.review_item(
                item, data["action"], reviewed_by=request.user,
                condition_on_return=data.get("condition_on_return", ""),
                notes=data.get("notes", ""),
            )
        except DjangoValidationError as e:
            raise DRFValidationError(e.message if hasattr(e, "message") else str(e))

        return Response(ClearanceItemSerializer(item).data)