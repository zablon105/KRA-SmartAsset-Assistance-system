from django.urls import path
from .views import (
    MeView,
    RolePermissionListView,
    UserListView,
    UserRolePermissionDetailView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)

urlpatterns = [
    path("me/", MeView.as_view(), name="me"),
    path("users/", UserListView.as_view(), name="user-list"),
    path("users/permissions/", RolePermissionListView.as_view(), name="role-permissions-list"),
    path("users/<int:pk>/permissions/", UserRolePermissionDetailView.as_view(), name="role-permissions-detail"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
]