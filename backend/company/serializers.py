from rest_framework import serializers

from accounts.serializers import OwnerRegistrationSerializer
from .models import (
    Reservation, Company, Subscription, SubscriptionType
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
    
    # def create(self, validated_data):
    #     # owner_serializer = OwnerCreateSerializer()
    #     # owner_serializer = self.fields['owner'].child
    #     # subscription_serializer = SubscriptionRegistrationSerializer()
    #     # subscription_serializer = self.fields['subscription'].child

    #     # Create Company first
    #     company = self.Meta.model.objects.create(**validated_data)

    #     # Create Owner with the company instance (assuming company is required)
    #     # owner_data = validated_data['owner']
    #     # owner_data['email'] = company.contact_email
    #     # owner_data['company'] = company  # Set the company for the owner
    #     # owner = owner_serializer.create(owner_data)

    #     # Create Subscription with the company instance
    #     # subscription_data = validated_data['subscription']
    #     # subscription_data['company'] = company

    #     # Set start_date as today's date
    #     # from django.utils import timezone
    #     # today = timezone.now().date()
    #     # subscription_data['start_date'] = today

    #     # Set end_date as today's date plus 6 days
    #     # subscription_data['end_date'] = today + timezone.timedelta(days=6)

    #     # subscription = subscription_serializer.create(subscription_data)

    #     return company

