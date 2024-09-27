from django.urls import path
from .views import (
    UserInfoView, LoginView, LogoutView,
    RegistrationView, RefreshTokensView
)

urlpatterns = [
    path('userinfo', UserInfoView.as_view(), name='user_info'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('registration', RegistrationView.as_view(), name='registration'),
    path('token', RefreshTokensView.as_view(), name='refresh_tokens'),
]
