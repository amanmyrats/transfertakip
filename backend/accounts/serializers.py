from django.contrib.auth.hashers import make_password

from rest_framework import serializers

from .models import Account, Role, AccountRole


class OwnerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name', 'email', )


class RoleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'


class AccountRoleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountRole
        fields = '__all__'


class AccountModelSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', 'role')
        read_only_fields = ('is_active', 'is_staff', 'is_superuser', 'date_joined')

    def create(self, validated_data):
        role_id = validated_data.pop('role', None)
        validated_data['password'] = make_password(validated_data['email'])
        validated_data['company'] = self.context.get('request').user.company
        account = super().create(validated_data)
        if role_id:
            role = Role.objects.get(id=role_id)
            AccountRole.objects.create(account=account, role=role)
        return account
    
    def to_representation(self, instance):
        # Custom representation to include role information in the output
        representation = super().to_representation(instance)
        if hasattr(instance, 'company_role'):
            representation['role'] = instance.company_role.role.id
        else:
            representation['role'] = None
        return representation
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )
        read_only_fields = ('email', 'is_active', 'is_staff', 'is_superuser', 'date_joined', )

