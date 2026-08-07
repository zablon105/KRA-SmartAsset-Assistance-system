from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model with a role field so we can tell ICT Admins,
    ICT Officers, and regular Employees apart across the whole system.
    """

    class Role(models.TextChoices):
        ADMIN = "admin", "ICT Admin"
        OFFICER = "officer", "ICT Officer"
        EMPLOYEE = "employee", "Employee"

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EMPLOYEE,
    )
    station = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=100, blank=True, default="ICT Department")
    profile_image = models.TextField(blank=True, default="")

    def __str__(self):
        return f"{self.username} ({self.role})"


class RolePermission(models.Model):
    class Role(models.TextChoices):
        ADMIN = "admin", "System Administrator"
        OFFICER = "officer", "ICT Officer"
        EMPLOYEE = "employee", "Tax / Customs Employee"
        AUDITOR = "auditor", "Auditor / Compliance"

    role = models.CharField(max_length=30, choices=Role.choices, unique=True)
    permissions = models.TextField(blank=True, default="")

    def __str__(self):
        return f"{self.get_role_display()} permissions"
