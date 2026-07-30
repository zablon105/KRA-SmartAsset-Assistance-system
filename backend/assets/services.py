"""
Shared logic for the assets app. Views should call these functions
instead of creating AssetAssignment/AssetHistory rows directly, so that
history logging and business rules (like "one active owner per asset")
can never be accidentally skipped.
"""

from django.core.exceptions import ValidationError
from django.utils import timezone

from .models import Asset, AssetAssignment, AssetHistory


def log_history(asset, action, performed_by=None, notes=""):
    """Create an audit trail entry for an asset."""
    return AssetHistory.objects.create(
        asset=asset,
        action=action,
        performed_by=performed_by,
        notes=notes,
    )


def assign_asset(asset, employee, performed_by=None, notes=""):
    """
    Assign an asset to an employee. Refuses if the asset already has
    an active assignment — use transfer_asset() to move it instead.
    """
    if asset.assignments.filter(is_active=True).exists():
        raise ValidationError(
            f"{asset.asset_tag} already has an active assignment. "
            "Use transfer_asset() to reassign it."
        )

    assignment = AssetAssignment.objects.create(asset=asset, employee=employee)
    asset.status = Asset.Status.ASSIGNED
    asset.save(update_fields=["status", "updated_at"])
    log_history(
        asset,
        AssetHistory.Action.ASSIGNED,
        performed_by=performed_by,
        notes=notes or f"Assigned to {employee.username}",
    )
    return assignment


def transfer_asset(asset, new_employee, performed_by=None, notes=""):
    """
    Close out the asset's current active assignment (if any) and
    create a new one for new_employee. Logs a single 'transferred' entry.
    """
    current = asset.assignments.filter(is_active=True).first()
    if current:
        current.is_active = False
        current.returned_date = timezone.now()
        current.save(update_fields=["is_active", "returned_date"])

    new_assignment = AssetAssignment.objects.create(asset=asset, employee=new_employee)
    asset.status = Asset.Status.ASSIGNED
    asset.save(update_fields=["status", "updated_at"])

    from_user = current.employee.username if current else "unassigned"
    log_history(
        asset,
        AssetHistory.Action.TRANSFERRED,
        performed_by=performed_by,
        notes=notes or f"Transferred from {from_user} to {new_employee.username}",
    )
    return new_assignment


def return_asset(asset, performed_by=None, notes=""):
    """
    Close out the asset's active assignment and mark it available again.
    Used outside the clearance flow (e.g. employee just hands a spare back).
    """
    current = asset.assignments.filter(is_active=True).first()
    if not current:
        raise ValidationError(f"{asset.asset_tag} has no active assignment to return.")

    current.is_active = False
    current.returned_date = timezone.now()
    current.save(update_fields=["is_active", "returned_date"])

    asset.status = Asset.Status.AVAILABLE
    asset.save(update_fields=["status", "updated_at"])
    log_history(asset, AssetHistory.Action.RETURNED, performed_by=performed_by, notes=notes)
    return current