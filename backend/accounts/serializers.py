from rest_framework import serializers

from .models import Account


class OwnerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name', 'email', )

    def create(self, validated_data):
        # Generate a random password (replace with your preferred logic)
        from django.utils.crypto import get_random_string
        password = get_random_string(length=10)
        username = validated_data['email']

        validated_data['password'] = password  # Set password in validated data
        validated_data['username'] = username

        # Create Account instance with password hashing handled automatically
        account = Account.objects.create_user(**validated_data)
        return account