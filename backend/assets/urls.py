from rest_framework.routers import DefaultRouter
from .views import AssetViewSet, AssetAssignmentViewSet, AssetHistoryViewSet

router = DefaultRouter()
router.register(r"assets", AssetViewSet, basename="asset")
router.register(r"assignments", AssetAssignmentViewSet, basename="assetassignment")
router.register(r"history", AssetHistoryViewSet, basename="assethistory")

urlpatterns = router.urls