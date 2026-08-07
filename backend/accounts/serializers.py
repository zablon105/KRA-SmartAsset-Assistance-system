from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import RolePermission

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role",
            "station",
            "department",
            "profile_image",
            "is_staff",
        ]
        read_only_fields = ["id", "username", "role", "is_staff"]


class RolePermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolePermission
        fields = ["id", "role", "permissions"]
        read_only_fields = ["id", "role"]


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(min_length=8)