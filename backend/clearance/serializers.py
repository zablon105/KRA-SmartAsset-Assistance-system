from rest_framework import serializers
from .models import ClearanceRequest, ClearanceItem


class ClearanceItemSerializer(serializers.ModelSerializer):
    asset_tag = serializers.CharField(source="asset.asset_tag", read_only=True)
    asset_category = serializers.CharField(source="asset.get_category_display", read_only=True)
    asset_serial = serializers.CharField(source="asset.serial_number", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    condition_display = serializers.CharField(
        source="get_condition_on_return_display", read_only=True, default=None
    )

    class Meta:
        model = ClearanceItem
        fields = [
            "id", "clearance_request", "asset", "asset_tag", "asset_category",
            "asset_serial", "status", "status_display", "condition_on_return",
            "condition_display", "evidence_photo_url", "reviewer_notes",
            "reviewed_by", "reviewed_at",
        ]
        read_only_fields = [
            "clearance_request", "asset", "status", "reviewed_by", "reviewed_at",
        ]


class ClearanceRequestSerializer(serializers.ModelSerializer):
    employee_username = serializers.CharField(source="employee.username", read_only=True)
    employee_full_name = serializers.SerializerMethodField()
    employee_department = serializers.CharField(source="employee.department", read_only=True, default="ICT Department")
    reason_display = serializers.CharField(source="get_reason_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    items = ClearanceItemSerializer(many=True, read_only=True)

    manager_approved_by_name = serializers.CharField(source="manager_approved_by.username", read_only=True, default=None)
    ict_verified_by_name = serializers.CharField(source="ict_verified_by.username", read_only=True, default=None)
    finance_approved_by_name = serializers.CharField(source="finance_approved_by.username", read_only=True, default=None)

    def get_employee_full_name(self, obj):
        emp = obj.employee
        full = f"{emp.first_name} {emp.last_name}".strip()
        return full if full else emp.username

    class Meta:
        model = ClearanceRequest
        fields = [
            "id", "employee", "employee_username", "employee_full_name", "employee_department",
            "reason", "reason_display", "status", "status_display", "initiated_by",
            "certificate_id", "certificate_hash", "cleared_at",
            "manager_approved_by", "manager_approved_by_name",
            "ict_verified_by", "ict_verified_by_name",
            "finance_approved_by", "finance_approved_by_name",
            "created_at", "resolved_at", "items",
        ]
        read_only_fields = ["status", "initiated_by", "created_at", "resolved_at", "items", "certificate_id", "certificate_hash", "cleared_at"]


class InitiateClearanceSerializer(serializers.Serializer):
    """Input for POST /api/clearance/requests/"""
    employee_id = serializers.IntegerField()
    reason = serializers.ChoiceField(choices=ClearanceRequest.Reason.choices)


class ReviewClearanceItemSerializer(serializers.Serializer):
    """Input for POST /api/clearance/items/{id}/review/"""
    action = serializers.ChoiceField(choices=["approve", "reject"])
    condition_on_return = serializers.ChoiceField(
        choices=ClearanceItem.Condition.choices, required=False, allow_blank=True, default=""
    )
    notes = serializers.CharField(required=False, allow_blank=True, default="")