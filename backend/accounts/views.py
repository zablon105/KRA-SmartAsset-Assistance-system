from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from accounts.permissions import IsICTOfficerOrAdmin
from .serializers import PasswordResetConfirmSerializer, PasswordResetRequestSerializer, UserSerializer

User = get_user_model()


class MeView(RetrieveAPIView):
    """GET /api/me/ — returns the currently authenticated user's profile."""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserListView(ListAPIView):
    """
    GET /api/users/ — list of users for officer/admin dropdowns
    (assigning assets, initiating clearances). Not exposed to employees.
    """
    serializer_class = UserSerializer
    permission_classes = [IsICTOfficerOrAdmin]
    queryset = User.objects.all().order_by("username")


# --- Password reset (email delivered via Resend, see settings.EMAIL_BACKEND) ---

class PasswordResetRequestView(APIView):
    """
    POST /api/password-reset/  {"email": "..."}
    Always returns 200 with a generic message, whether or not the email
    exists — this prevents leaking which emails are registered.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        user = User.objects.filter(email__iexact=email).first()
        if user:
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"

            send_mail(
                subject="Reset your IAMDCS password",
                message=(
                    f"Hi {user.username},\n\n"
                    f"Click the link below to reset your IAMDCS password:\n"
                    f"{reset_link}\n\n"
                    f"If you didn't request this, you can ignore this email."
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )

        return Response(
            {"detail": "If that email is registered, a reset link has been sent."}
        )


class PasswordResetConfirmView(APIView):
    """POST /api/password-reset-confirm/  {"uid", "token", "new_password"}"""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            uid = force_str(urlsafe_base64_decode(data["uid"]))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"detail": "Invalid reset link."}, status=400)

        if not default_token_generator.check_token(user, data["token"]):
            return Response({"detail": "This reset link is invalid or has expired."}, status=400)

        user.set_password(data["new_password"])
        user.save()
        return Response({"detail": "Password has been reset successfully."})
