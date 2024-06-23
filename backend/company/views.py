from django.shortcuts import render

from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from accounts.serializers import OwnerRegistrationSerializer
from accounts.models import Account
from .serializers import CompanyCreateSerializer
from .models import (
    Reservation, Company, SubscriptionType, Subscription
)
from .serializers import (
    ReservationModelSerializer, CompanyModelSerializer, 
    SubscriptionTypeModelSerializer
)

class ReservationModelViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationModelSerializer


class SubscriptionTypeModelViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionType.objects.all()
    serializer_class = SubscriptionTypeModelSerializer


class CompanyModelViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanyModelSerializer


class CompanyCreateAPIView(APIView):
    permission_class = [AllowAny]
    authentication_classes = []

    def post(self, request):
        print('inside CompanyCreateAPIView')
        print('self.permission_classes',self.permission_classes)
        serializer = CompanyCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            validated_data = serializer.validated_data


            # Create Owner object (assuming Owner model exists)
            owner_data = validated_data['owner']
            # owner = Account.objects.create(**owner_data)  # Use appropriate create method

            # Create Subscription object (assuming Subscription model exists)
            subscription_data = validated_data['subscription']
            # subscription = Subscription.objects.create(**subscription_data)  # Use appropriate create method

            # Create Company object with owner and subscription references
            company = Company.objects.create(
                name=validated_data['name'],
                contact_email=validated_data['contact_email'],
                contact_phone=validated_data['contact_phone'],
            )
            # Generate a random password (replace with your preferred logic)
            from django.utils.crypto import get_random_string
            password = get_random_string(length=10)

            owner = Account.objects.create_user(
                username=owner_data['email'],
                email=owner_data['email'],
                first_name=owner_data['first_name'],
                password=password, 
                company=company
            )
            # Set start_date as today's date
            from django.utils import timezone
            today = timezone.now().date()
            subscription_data['start_date'] = today
            # Set end_date as today's date plus 6 days
            subscription_data['end_date'] = today + timezone.timedelta(days=6)

            subscription = Subscription.objects.create(
                company=company, 
                subscription_type=subscription_data['subscription_type'],
                start_date=subscription_data['start_date'], 
                end_date=subscription_data['end_date']
            )

            # Send telegram message to admins
            # Send mail to admins
            # companys page for admins, so that they can approve new company requests

            return Response(serializer.data, status=status.HTTP_201_CREATED)
