from rest_framework import viewsets, filters
from django.utils import timezone
from accounts.permissions import IsICTOfficerOrAdmin
from .models import MaintenanceTicket
from .serializers import MaintenanceTicketSerializer

class MaintenanceTicketViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceTicket.objects.all()
    serializer_class = MaintenanceTicketSerializer
    permission_classes = [IsICTOfficerOrAdmin]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["asset__asset_tag", "asset__serial_number", "issue_description", "remarks"]
    ordering_fields = ["created_at", "priority", "status"]

    def get_queryset(self):
        qs = super().get_queryset()
        status_param = self.request.query_params.get("status")
        priority_param = self.request.query_params.get("priority")
        asset_id = self.request.query_params.get("asset")
        if status_param:
            qs = qs.filter(status=status_param)
        if priority_param:
            qs = qs.filter(priority=priority_param)
        if asset_id:
            qs = qs.filter(asset_id=asset_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(reported_by=self.request.user)

    def perform_update(self, serializer):
        # Auto-set resolved_at if status becomes resolved
        status = self.request.data.get("status")
        if status == MaintenanceTicket.Status.RESOLVED:
            serializer.save(resolved_at=timezone.now())
        else:
            serializer.save()
