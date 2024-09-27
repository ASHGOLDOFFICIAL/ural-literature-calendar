from django.conf import settings
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
from rest_framework.status import HTTP_201_CREATED
from rest_framework.views import APIView
from .serializers import UserSerializer
from ..authentication import (
    create_access_token, decode_access_token,
    create_refresh_token, decode_refresh_token
)
from ..models import User


class UserInfoView(APIView):
    model = User
    serializer_class = UserSerializer

    def get_object(self, request):
        token = request.COOKIES.get(settings.JWT['ACCESS_TOKEN_NAME'])

        if token is None:
            raise NotAuthenticated()

        obj = self.model.objects.get(id=decode_access_token(token))
        return obj

    def get(self, request):
        obj = self.get_object(request)
        serializer = self.serializer_class(obj)
        return Response(serializer.data)

    def put(self, request):
        instance = self.get_object(request)
        serializer = self.serializer_class(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.get(email=email)
        if user is None:
            raise AuthenticationFailed()

        if not user.check_password(password):
            raise AuthenticationFailed()

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        response.set_cookie(
            key=settings.JWT['ACCESS_TOKEN_NAME'],
            value=access_token,
            httponly=settings.JWT['HTTPONLY'],
            samesite=settings.JWT['SAMESITE'],
            secure=settings.JWT['SECURE'],
        )
        response.set_cookie(
            key=settings.JWT['REFRESH_TOKEN_NAME'],
            value=refresh_token,
            httponly=settings.JWT['HTTPONLY'],
            samesite=settings.JWT['SAMESITE'],
            secure=settings.JWT['SECURE'],
        )

        response.data = {'username': user.username}
        return response


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie(settings.JWT['ACCESS_TOKEN_NAME'])
        response.delete_cookie(settings.JWT['REFRESH_TOKEN_NAME'])
        response.data = {
            'message': 'success'
        }
        return response


class RegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)


class RefreshTokensView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get(settings.JWT['REFRESH_TOKEN_NAME'])
        if refresh_token is None:
            raise NotAuthenticated()

        user_id = decode_refresh_token(refresh_token)
        access_token = create_access_token(user_id)
        refresh_token = create_refresh_token(user_id)

        response = Response()
        response.set_cookie(
            key=settings.JWT['ACCESS_TOKEN_NAME'],
            value=access_token,
            httponly=settings.JWT['HTTPONLY'],
            samesite=settings.JWT['SAMESITE'],
            secure=settings.JWT['SECURE'],
        )
        response.set_cookie(
            key=settings.JWT['REFRESH_TOKEN_NAME'],
            value=refresh_token,
            httponly=settings.JWT['HTTPONLY'],
            samesite=settings.JWT['SAMESITE'],
            secure=settings.JWT['SECURE'],
        )

        response.data = {'detail': 'success'}
        return response
