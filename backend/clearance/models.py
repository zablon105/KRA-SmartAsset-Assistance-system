from django.conf import settings
from django.db import models
from assets.models import Asset


class ClearanceRequest(models.Model):
    """
    One clearance event for one employee (transfer, resignation, or
    retirement). Items are auto-populated from the employee's currently
    assigned assets when the request is created.
    """

    class Reason(models.TextChoices):
        TRANSFER = "transfer", "Transfer"
        RESIGNATION = "resignation", "Resignation"
        RETIREMENT = "retirement", "Retirement"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
        related_name="clearance_requests",
    )
    reason = models.CharField(max_length=20, choices=Reason.choices)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    initiated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
        related_name="clearances_initiated",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    cleared_at = models.DateTimeField(null=True, blank=True)

    # Certificate Generation & Verification
    certificate_id = models.CharField(max_length=100, blank=True, null=True, unique=True)
    certificate_hash = models.CharField(max_length=100, blank=True)

    manager_approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="clearances_approved_as_manager"
    )
    ict_verified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="clearances_verified_as_ict"
    )
    finance_approved_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="clearances_approved_as_finance"
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Clearance #{self.id} — {self.employee.username} ({self.get_status_display()})"


class ClearanceItem(models.Model):
    """
    One asset within a clearance request. Each item is reviewed
    individually by ICT before the overall clearance can be approved.
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    class Condition(models.TextChoices):
        EXCELLENT = "excellent", "Excellent"
        GOOD = "good", "Good"
        FAIR = "fair", "Fair"
        POOR = "poor", "Poor"
        MISSING = "missing", "Missing"

    clearance_request = models.ForeignKey(
        ClearanceRequest, on_delete=models.CASCADE, related_name="items"
    )
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    condition_on_return = models.CharField(
        max_length=20, choices=Condition.choices, null=True, blank=True
    )
    evidence_photo_url = models.URLField(blank=True)
    reviewer_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.asset.asset_tag} in Clearance #{self.clearance_request_id} ({self.get_status_display()})"