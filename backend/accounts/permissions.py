"""
Role-based permission classes shared across the whole API.
IAMDCS has three roles: admin (ICT Admin), officer (ICT Officer), employee.
"""

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsICTAdmin(BasePermission):
    """Full access only for ICT Admins."""

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )


class IsICTOfficerOrAdmin(BasePermission):
    """ICT Officers and Admins can act; everyone authenticated can read."""

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.role in ("officer", "admin")


class IsOwnerOrOfficerOrAdmin(BasePermission):
    """
    Employees can only read their own related records; officers/admins
    can read and write everything. Used for per-object checks (e.g. an
    employee viewing their own AssetAssignment history).
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.role in ("officer", "admin"):
            return True
        # Fallback: obj must have an 'employee' attribute pointing to the user
        return getattr(obj, "employee_id", None) == user.id