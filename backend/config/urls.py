"""
URL configuration for the IAMDCS project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import TokenObtainPairByUsernameOrEmailView

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT auth: POST username/email + password here to get access + refresh tokens
    path('api/token/', TokenObtainPairByUsernameOrEmailView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App routes
    path('api/', include('assets.urls')),
    path('api/', include('accounts.urls')),
    path('api/', include('clearance.urls')),
    path('api/maintenance/', include('maintenance.urls')),
]