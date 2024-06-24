from rest_framework import serializers

from accounts.serializers import OwnerRegistrationSerializer
from accounts.models import Account
from .models import (
    Reservation, Company, Subscription, SubscriptionType, DefaultCurrency, 
    Currency, DefaultCarType, CarType, Car, Driver, ExpenseType, Expense, 
    SubscriptionType, Subscription, DefaultExpenseType
) 

    


class ReservationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class CompanyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class SubscriptionRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('subscription_type',)


class SubscriptionTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = '__all__'


class CompanyCreateSerializer(serializers.ModelSerializer):
    owner = OwnerRegistrationSerializer()
    subscription = SubscriptionRegistrationSerializer()
    class Meta:
        model = Company
        fields = ('name', 'contact_email', 'contact_phone', 'owner', 'subscription', )


class CompanyUserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password', 'first_name', 'last_name', 'phone')


class CompanyUserPasswordChangeSerializer(serializers.ModelSerializer):
    password_new = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    class Meta:
        model = Account
        fields = ('password', 'password_new', 'password_confirm')


class DefaultCurrencyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultCurrency
        fields = '__all__'


class CurrencyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__' 


class DefaultCarTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultCarType
        fields = '__all__'


class CarTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = '__all__'

    
class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class DriverModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'


class DefaultExpenseTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultExpenseType
        fields = '__all__'


class ExpenseTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseType
        fields = '__all__'


class ExpenseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class SubcriptionTypeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = '__all__'


class SubscriptionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'