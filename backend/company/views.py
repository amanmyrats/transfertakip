from django.shortcuts import render

from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from accounts.models import Account, Role, AccountRole
from .serializers import (
    CompanyCreateSerializer, CompanyUserModelSerializer,
    DefaultCurrencyModelSerializer, CurrencyModelSerializer,
    DefaultCarTypeModelSerializer, CarTypeModelSerializer,
    CarModelSerializer, DefaultExpenseTypeModelSerializer,
    ExpenseTypeModelSerializer, ExpenseModelSerializer,
    DriverModelSerializer, SubscriptionModelSerializer

)
from .models import (
    Reservation, Company, SubscriptionType, Subscription, 
    DefaultCurrency, Currency, DefaultCarType, CarType,
    Car, DefaultExpenseType, ExpenseType, Expense, Driver
)
from .serializers import (
    ReservationModelSerializer, CompanyModelSerializer, 
    SubscriptionTypeModelSerializer
)

class ReservationModelViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationModelSerializer


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

            # Create Subscription object (assuming Subscription model exists)
            subscription_data = validated_data['subscription']

            # Create Company object with owner and subscription references
            company = Company.objects.create(
                name=validated_data['name'],
                contact_email=validated_data['contact_email'],
                contact_phone=validated_data['contact_phone'],
            )
            # Generate a random password (replace with your preferred logic)
            from django.utils.crypto import get_random_string
            # password = get_random_string(length=10)
            password = validated_data['contact_email']

            owner = Account.objects.create_user(
                email=owner_data['email'],
                first_name=owner_data['first_name'],
                password=password, 
                company=company, 
                is_owner=True
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

            role_exists = Role.objects.filter(role_name='yonetici').exists()
            if not role_exists:
                role = Role.objects.create(role_name='yonetici')
            else:
                role = Role.objects.get(role_name='yonetici')
            AccountRole.objects.create(account=owner, role=role)

            # Send telegram message to admins
            # Send mail to admins
            # companys page for admins, so that they can approve new company requests

            return Response(serializer.data, status=status.HTTP_201_CREATED)


class CompanyUserModelViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = CompanyUserModelSerializer

    # add password change logic here
    # add password reset logic here
    # add password forgot logic here
    @action(detail=True, methods=['post'])
    def changepassword(self, request, pk=None):
        print('inside changepassword')


class DefaultCurrencyModelViewSet(viewsets.ModelViewSet):
    queryset = DefaultCurrency.objects.all()
    serializer_class = DefaultCurrencyModelSerializer


class CurrencyModelViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencyModelSerializer


class DefaultCarTypeModelViewSet(viewsets.ModelViewSet):
    queryset = DefaultCarType.objects.all()
    serializer_class = DefaultCarTypeModelSerializer


class CarTypeModelViewSet(viewsets.ModelViewSet):
    queryset = CarType.objects.all()
    serializer_class = CarTypeModelSerializer


class CarModelViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarModelSerializer


class DefaultExpenseTypeModelViewSet(viewsets.ModelViewSet):
    queryset = DefaultExpenseType.objects.all()
    serializer_class = DefaultExpenseTypeModelSerializer


class ExpenseTypeModelViewSet(viewsets.ModelViewSet):
    queryset = ExpenseType.objects.all()
    serializer_class = ExpenseTypeModelSerializer


class ExpenseModelViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseModelSerializer


class DriverModelViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverModelSerializer

    # def handle_exception(self, exc, context):
    #     # Pass through existing exception handlers
    #     response = exception_handler(exc, context)

    #     # If no existing handler was found, handle it here
    #     if response is None:
            
    #         self.raise_uncaught_exception(exc, context)
    #         # # Check for specific exceptions (optional)
    #         # if isinstance(exc, ValidationError):
    #         #     # Return JSON with validation errors
    #         #     return response(exc.detail, status=status.HTTP_400_BAD_REQUEST)
    #         # else:
    #         #     # Return generic error for other exceptions
    #         #     return response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #     return response

class SubscriptionModelViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionModelSerializer


class SubscriptionTypeModelViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionType.objects.all()
    serializer_class = SubscriptionTypeModelSerializer
    permission_class = [AllowAny]
    authentication_classes = []



