from rest_framework.routers import DefaultRouter
from .views import ClearanceRequestViewSet, ClearanceItemViewSet

router = DefaultRouter()
router.register(r"clearance/requests", ClearanceRequestViewSet, basename="clearancerequest")
router.register(r"clearance/items", ClearanceItemViewSet, basename="clearanceitem")

urlpatterns = router.urls