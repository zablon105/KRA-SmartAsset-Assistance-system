from django.contrib import admin
from .models import ClearanceRequest, ClearanceItem


class ClearanceItemInline(admin.TabularInline):
    model = ClearanceItem
    extra = 0
    readonly_fields = ["asset", "status", "reviewed_by", "reviewed_at"]
    can_delete = False


@admin.register(ClearanceRequest)
class ClearanceRequestAdmin(admin.ModelAdmin):
    list_display = ["id", "employee", "reason", "status", "created_at", "resolved_at"]
    list_filter = ["reason", "status"]
    search_fields = ["employee__username"]
    inlines = [ClearanceItemInline]

    def has_add_permission(self, request):
        # Clearances must be created via services.initiate_clearance()
        # so items get auto-populated correctly — not blank from admin.
        return False


@admin.register(ClearanceItem)
class ClearanceItemAdmin(admin.ModelAdmin):
    list_display = ["clearance_request", "asset", "status", "reviewed_by", "reviewed_at"]
    list_filter = ["status"]

    def has_add_permission(self, request):
        return False