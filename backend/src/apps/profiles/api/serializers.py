from rest_framework import serializers
from apps.authentication.models import User
from ..models import Avatar, Profile


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ('id',)


class ProfileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'username', 'first_name',
            'last_name', 'birthdate', 'is_staff'
        )


class ProfileAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = ('image_url', )


class ProfileSerializer(serializers.ModelSerializer):
    user = ProfileUserSerializer()
    avatar = ProfileAvatarSerializer()

    class Meta:
        model = Profile
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user_data = data.pop('user', None)
        for key, value in user_data.items():
            data[key] = value

        avatar_data = data.pop('avatar', None)
        if avatar_data is not None:
            data['avatar'] = avatar_data['image_url']
        else:
            data['avatar'] = None

        return data
