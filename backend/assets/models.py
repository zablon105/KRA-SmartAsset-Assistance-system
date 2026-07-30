from django.conf import settings
from django.db import models


class Asset(models.Model):
    """
    One row per physical ICT device KRA owns. Registered once, then
    assigned/transferred/returned over its lifetime via AssetAssignment.
    """

    class Category(models.TextChoices):
        LAPTOP = "laptop", "Laptop"
        MINI_DESKTOP = "mini_desktop", "Mini Desktop"
        CISCO_PHONE = "cisco_phone", "Cisco IP Phone"
        MONITOR = "monitor", "Monitor"
        MIFI = "mifi", "MiFi"
        VPN_TOKEN = "vpn_token", "VPN Token"
        KEYBOARD = "keyboard", "Keyboard"
        MOUSE = "mouse", "Mouse"
        OTHER = "other", "Other ICT Equipment"

    class Status(models.TextChoices):
        AVAILABLE = "available", "Available"
        ASSIGNED = "assigned", "Assigned"
        UNDER_REPAIR = "under_repair", "Under Repair"
        PENDING_RETURN = "pending_return", "Pending Return"
        DISPOSED = "disposed", "Disposed"

    class Condition(models.TextChoices):
        EXCELLENT = "excellent", "Excellent"
        GOOD = "good", "Good"
        FAIR = "fair", "Fair"
        POOR = "poor", "Poor"

    asset_tag = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    brand = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100, blank=True)
    serial_number = models.CharField(max_length=100, unique=True)
    purchase_date = models.DateField(null=True, blank=True)
    warranty_expiry = models.DateField(null=True, blank=True)
    station = models.CharField(max_length=100, blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.AVAILABLE
    )
    condition = models.CharField(
        max_length=20, choices=Condition.choices, default=Condition.GOOD
    )
    # Network Discovery Specs
    ip_address = models.CharField(max_length=50, blank=True)
    mac_address = models.CharField(max_length=50, blank=True)
    hostname = models.CharField(max_length=100, blank=True)
    os_name = models.CharField(max_length=100, blank=True, default="Windows 11 Pro")
    antivirus_status = models.CharField(max_length=50, blank=True, default="Active & Updated")
    encryption_status = models.CharField(max_length=50, blank=True, default="BitLocker Enabled")

    # AI Asset Health & Risk Engine Metrics
    battery_health_pct = models.IntegerField(default=100)
    disk_health_pct = models.IntegerField(default=100)
    health_score = models.IntegerField(default=90)
    risk_score = models.IntegerField(default=1)  # Scale 1-10
    last_seen = models.DateTimeField(null=True, blank=True)
    ai_recommendations = models.TextField(blank=True)
    qr_code_hash = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.asset_tag} — {self.get_category_display()} ({self.serial_number})"


class AssetAssignment(models.Model):
    """
    Tracks who currently holds an asset. Only one active assignment
    per asset is allowed at a time (enforced in services.py, not the DB,
    so we can give a clear error message instead of a raw IntegrityError).
    """

    asset = models.ForeignKey(
        Asset, on_delete=models.CASCADE, related_name="assignments"
    )
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="asset_assignments"
    )
    assigned_date = models.DateTimeField(auto_now_add=True)
    returned_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-assigned_date"]

    def __str__(self):
        status = "active" if self.is_active else "returned"
        return f"{self.asset.asset_tag} → {self.employee.username} ({status})"


class AssetHistory(models.Model):
    """
    Append-only audit trail. Every meaningful action on an asset gets
    logged here via assets/services.py, so nothing can happen to a
    device without leaving a trace.
    """

    class Action(models.TextChoices):
        REGISTERED = "registered", "Registered"
        ASSIGNED = "assigned", "Assigned"
        TRANSFERRED = "transferred", "Transferred"
        REPAIRED = "repaired", "Repaired"
        RETURNED = "returned", "Returned"
        CLEARED = "cleared", "Cleared"
        DISPOSED = "disposed", "Disposed"

    asset = models.ForeignKey(
        Asset, on_delete=models.CASCADE, related_name="history"
    )
    action = models.CharField(max_length=20, choices=Action.choices)
    performed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    notes = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
        verbose_name_plural = "Asset history"

    def __str__(self):
        return f"{self.asset.asset_tag}: {self.get_action_display()} at {self.timestamp:%Y-%m-%d %H:%M}"