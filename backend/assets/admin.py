from django.contrib import admin
from .models import Asset, AssetAssignment, AssetHistory


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = (
        "asset_tag", "category", "brand", "serial_number",
        "station", "status", "condition",
    )
    list_filter = ("category", "status", "condition", "station")
    search_fields = ("asset_tag", "serial_number", "brand", "model_name")


@admin.register(AssetAssignment)
class AssetAssignmentAdmin(admin.ModelAdmin):
    list_display = ("asset", "employee", "assigned_date", "returned_date", "is_active")
    list_filter = ("is_active",)
    search_fields = ("asset__asset_tag", "employee__username")


@admin.register(AssetHistory)
class AssetHistoryAdmin(admin.ModelAdmin):
    list_display = ("asset", "action", "performed_by", "timestamp")
    list_filter = ("action",)
    search_fields = ("asset__asset_tag",)
    readonly_fields = ("asset", "action", "performed_by", "notes", "timestamp")

    def has_add_permission(self, request):
        # History entries should only ever be created via services.py,
        # never manually typed in from the admin panel.
        return False