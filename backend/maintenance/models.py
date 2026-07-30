from django.db import models
from django.conf import settings
from assets.models import Asset

class MaintenanceTicket(models.Model):
    class Priority(models.TextChoices):
        LOW = "low", "Low Priority"
        MEDIUM = "medium", "Medium Priority"
        HIGH = "high", "High Priority"

    class Status(models.TextChoices):
        OPEN = "open", "Open"
        IN_PROGRESS = "in_progress", "In Progress"
        RESOLVED = "resolved", "Resolved"

    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name="maintenance_tickets")
    reported_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="reported_tickets")
    technician = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_tickets")
    issue_description = models.TextField()
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.LOW)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Ticket #{self.id} — {self.asset.asset_tag} ({self.get_status_display()})"
