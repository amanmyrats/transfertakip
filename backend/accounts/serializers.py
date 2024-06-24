from rest_framework import serializers

from .models import Account


class OwnerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name', 'email', )


class AccountModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )
        read_only_fields = ('email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )
        read_only_fields = ('email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )