from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import AvatarSerializer, ProfileSerializer
from ..models import Avatar, Profile


class AvatarViewSet(ReadOnlyModelViewSet):
    queryset = Avatar.objects.all()
    serializer_class = AvatarSerializer

    def get_queryset(self):
        queryset = Avatar.objects.all()
        return queryset


class ProfileViewSet(ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = 'user__username'

    def get_queryset(self):
        queryset = Profile.objects.all()
        return queryset
