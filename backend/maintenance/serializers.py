from rest_framework import serializers
from .models import MaintenanceTicket

class MaintenanceTicketSerializer(serializers.ModelSerializer):
    asset_tag = serializers.CharField(source="asset.asset_tag", read_only=True)
    asset_category = serializers.CharField(source="asset.get_category_display", read_only=True)
    asset_brand = serializers.CharField(source="asset.brand", read_only=True)
    asset_model = serializers.CharField(source="asset.model_name", read_only=True)
    asset_serial = serializers.CharField(source="asset.serial_number", read_only=True)
    asset_station = serializers.CharField(source="asset.station", read_only=True)
    reported_by_username = serializers.CharField(source="reported_by.username", read_only=True)
    technician_username = serializers.CharField(source="technician.username", read_only=True, default=None)
    priority_display = serializers.CharField(source="get_priority_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)

    class Meta:
        model = MaintenanceTicket
        fields = [
            "id", "asset", "asset_tag", "asset_category", "asset_brand",
            "asset_model", "asset_serial", "asset_station",
            "reported_by", "reported_by_username",
            "technician", "technician_username",
            "issue_description", "priority", "priority_display",
            "status", "status_display", "remarks",
            "created_at", "updated_at", "resolved_at",
        ]
        read_only_fields = ["reported_by", "created_at", "updated_at", "resolved_at"]
