from rest_framework import serializers
from .models import Asset, AssetAssignment, AssetHistory


class AssetSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    condition_display = serializers.CharField(source="get_condition_display", read_only=True)

    current_assigned_to = serializers.SerializerMethodField()
    current_employee_id = serializers.SerializerMethodField()

    def get_current_assigned_to(self, obj):
        active_assignment = obj.assignments.filter(is_active=True).first()
        if active_assignment and active_assignment.employee:
            emp = active_assignment.employee
            full_name = f"{emp.first_name} {emp.last_name}".strip()
            return full_name if full_name else emp.username
        return None

    def get_current_employee_id(self, obj):
        active_assignment = obj.assignments.filter(is_active=True).first()
        return active_assignment.employee_id if active_assignment else None

    class Meta:
        model = Asset
        fields = [
            "id", "asset_tag", "category", "category_display",
            "brand", "model_name", "serial_number",
            "purchase_date", "warranty_expiry", "station",
            "status", "status_display", "condition", "condition_display",
            "ip_address", "mac_address", "hostname", "os_name",
            "antivirus_status", "encryption_status",
            "battery_health_pct", "disk_health_pct",
            "health_score", "risk_score", "last_seen",
            "ai_recommendations", "qr_code_hash",
            "current_assigned_to", "current_employee_id",
            "created_at", "updated_at",
        ]
        read_only_fields = ["status", "created_at", "updated_at"]
        # status is deliberately read-only here: it should only change
        # via assign_asset() / transfer_asset() / return_asset() in
        # services.py, never by direct edit through this serializer.


class AssetAssignmentSerializer(serializers.ModelSerializer):
    asset_tag = serializers.CharField(source="asset.asset_tag", read_only=True)
    employee_username = serializers.CharField(source="employee.username", read_only=True)

    class Meta:
        model = AssetAssignment
        fields = [
            "id", "asset", "asset_tag", "employee", "employee_username",
            "assigned_date", "returned_date", "is_active",
        ]
        read_only_fields = ["assigned_date", "returned_date", "is_active"]


class AssetHistorySerializer(serializers.ModelSerializer):
    asset_tag = serializers.CharField(source="asset.asset_tag", read_only=True)
    performed_by_username = serializers.CharField(
        source="performed_by.username", read_only=True, default=None
    )
    action_display = serializers.CharField(source="get_action_display", read_only=True)

    class Meta:
        model = AssetHistory
        fields = [
            "id", "asset", "asset_tag", "action", "action_display",
            "performed_by", "performed_by_username", "notes", "timestamp",
        ]
        read_only_fields = fields  # history is append-only, never edited via API


class AssignAssetSerializer(serializers.Serializer):
    """Input for POST /api/assets/{id}/assign/"""
    employee_id = serializers.IntegerField()
    notes = serializers.CharField(required=False, allow_blank=True, default="")


class TransferAssetSerializer(serializers.Serializer):
    """Input for POST /api/assets/{id}/transfer/"""
    employee_id = serializers.IntegerField()
    notes = serializers.CharField(required=False, allow_blank=True, default="")


class ReturnAssetSerializer(serializers.Serializer):
    """Input for POST /api/assets/{id}/return_asset/"""
    notes = serializers.CharField(required=False, allow_blank=True, default="")