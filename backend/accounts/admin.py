from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import RolePermission, User


class CustomUserAdmin(UserAdmin):
    """
    Extends Django's default UserAdmin so the 'role' and 'station'
    fields (specific to IAMDCS) show up and are editable in the admin panel.
    """
    fieldsets = UserAdmin.fieldsets + (
        ("IAMDCS Info", {"fields": ("role", "station")}),
    )
    list_display = ("username", "email", "role", "station", "is_staff")
    list_filter = ("role", "is_staff", "is_superuser")


admin.site.register(User, CustomUserAdmin)
admin.site.register(RolePermission)