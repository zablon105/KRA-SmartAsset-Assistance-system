"""
Shared logic for the clearance workflow. Views call these functions so
that asset status changes, history logging, and the "all items must be
approved before the request is complete" rule can't be bypassed.
"""

from django.core.exceptions import ValidationError
from django.utils import timezone

from assets.models import Asset, AssetAssignment, AssetHistory
from assets import services as asset_services
from .models import ClearanceRequest, ClearanceItem


def initiate_clearance(employee, reason, initiated_by=None):
    """
    Start a clearance for an employee. Auto-populates one ClearanceItem
    per asset the employee currently holds. If they hold nothing, the
    request is created and immediately auto-approved (nothing to clear).
    """
    request = ClearanceRequest.objects.create(
        employee=employee, reason=reason, initiated_by=initiated_by
    )

    active_assignments = AssetAssignment.objects.filter(
        employee=employee, is_active=True
    )
    for assignment in active_assignments:
        ClearanceItem.objects.create(
            clearance_request=request, asset=assignment.asset
        )
        # Block further reassignment while clearance is in progress.
        assignment.asset.status = Asset.Status.PENDING_RETURN
        assignment.asset.save(update_fields=["status", "updated_at"])

    if not active_assignments.exists():
        request.status = ClearanceRequest.Status.APPROVED
        request.resolved_at = timezone.now()
        request.save(update_fields=["status", "resolved_at"])

    return request


def review_item(item, action, reviewed_by, condition_on_return="", notes=""):
    """
    Approve or reject one asset within a clearance request.
    action must be 'approve' or 'reject'.
    """
    if action not in ("approve", "reject"):
        raise ValidationError("action must be 'approve' or 'reject'.")

    item.reviewer_notes = notes
    item.reviewed_by = reviewed_by
    item.reviewed_at = timezone.now()

    if action == "approve":
        item.status = ClearanceItem.Status.APPROVED
        item.condition_on_return = condition_on_return or ClearanceItem.Condition.GOOD
        item.save()

        # Approving an item means the physical asset has been returned —
        # free it up for reassignment and log it in the asset's own history.
        asset_services.return_asset(
            item.asset, performed_by=reviewed_by,
            notes=f"Returned via clearance #{item.clearance_request_id}",
        )
        asset_services.log_history(
            item.asset, AssetHistory.Action.CLEARED, performed_by=reviewed_by,
            notes=f"Cleared via clearance #{item.clearance_request_id}",
        )
    else:
        item.status = ClearanceItem.Status.REJECTED
        item.condition_on_return = condition_on_return or ClearanceItem.Condition.MISSING
        item.save()

    _maybe_auto_approve_request(item.clearance_request)
    return item


import uuid

def _maybe_auto_approve_request(request):
    """If every item on a request is approved, mark the request approved & generate digital certificate."""
    items = request.items.all()
    if items.exists() and all(i.status == ClearanceItem.Status.APPROVED for i in items):
        request.status = ClearanceRequest.Status.APPROVED
        request.resolved_at = timezone.now()
        request.cleared_at = timezone.now()
        if not request.certificate_id:
            request.certificate_id = f"KRA-ACC-2025-{request.id:06d}"
            request.certificate_hash = uuid.uuid4().hex[:16].upper()
        request.save(update_fields=["status", "resolved_at", "cleared_at", "certificate_id", "certificate_hash"])


def reject_clearance(request, performed_by=None, notes=""):
    """Manually stop a clearance request (e.g. critical asset still missing)."""
    request.status = ClearanceRequest.Status.REJECTED
    request.resolved_at = timezone.now()
    request.save(update_fields=["status", "resolved_at"])
    return request