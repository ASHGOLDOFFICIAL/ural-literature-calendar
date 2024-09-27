from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('email', 'username', 'first_name', 'last_name', 'birthdate', 'is_staff', 'password')
        read_only_fields = ('is_staff', 'password')
        depth = 1

    def create(self, validated_data):
        instance = self.Meta.model.objects.create_user(**validated_data)
        return instance

    def validate(self, attrs):
        username = attrs['username']
        if len(username) < 6:
            raise ValidationError({'username': ['Username must be at least 6 characters long.']})

        password = attrs['password']
        if len(password) < 8:
            raise ValidationError({'password': ['Username must be at least 6 characters long.']})
        return attrs
