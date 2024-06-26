from django.db.utils import IntegrityError

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from accounts.serializers import OwnerRegistrationSerializer
from accounts.models import Account
from .models import (
    Reservation, Company, Subscription, SubscriptionType, DefaultCurrency, 
    Currency, DefaultCarType, CarType, Car, Driver, ExpenseType, Expense, 
    SubscriptionType, Subscription, DefaultExpenseType
) 


class CreateModelSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['company'] = request.user.company
        return super().create(validated_data)
    
    class Meta:
        model = None
        fields = '__all__'
        read_only_fields = ('company',)

        
class ReservationModelSerializer(CreateModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class CompanyModelSerializer(CreateModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class SubscriptionRegistrationSerializer(CreateModelSerializer):
    class Meta:
        model = Subscription
        fields = ('subscription_type',)


class SubscriptionTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = '__all__'


class CompanyCreateSerializer(CreateModelSerializer):
    owner = OwnerRegistrationSerializer()
    subscription = SubscriptionRegistrationSerializer()
    class Meta:
        model = Company
        fields = ('name', 'contact_email', 'contact_phone', 'owner', 'subscription', )


class CompanyUserModelSerializer(CreateModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password', 'first_name', 'last_name')


class CompanyUserPasswordChangeSerializer(CreateModelSerializer):
    password_new = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    class Meta:
        model = Account
        fields = ('password', 'password_new', 'password_confirm')


class DefaultCurrencyModelSerializer(CreateModelSerializer):
    class Meta:
        model = DefaultCurrency
        fields = '__all__'


class CurrencyModelSerializer(CreateModelSerializer):
    class Meta:
        model = Currency 
        fields = '__all__'


class DefaultCarTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = DefaultCarType
        fields = '__all__'


class CarTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = CarType
        fields = '__all__'

    
class CarModelSerializer(CreateModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class DriverModelSerializer(CreateModelSerializer):
    class Meta:
        model = Driver
        fields = ('id', 'name',)


class DefaultExpenseTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = DefaultExpenseType
        fields = '__all__'


class ExpenseTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = ExpenseType
        fields = '__all__'


class ExpenseModelSerializer(CreateModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class SubcriptionTypeModelSerializer(CreateModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = '__all__'


class SubscriptionModelSerializer(CreateModelSerializer):
    class Meta:
        fields = '__all__'
        model = Subscription