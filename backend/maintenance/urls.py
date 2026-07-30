from rest_framework.routers import DefaultRouter
from .views import MaintenanceTicketViewSet

router = DefaultRouter()
router.register(r"tickets", MaintenanceTicketViewSet, basename="maintenanceticket")

urlpatterns = router.urls
