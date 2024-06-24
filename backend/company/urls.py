from django.urls import path, include
from rest_framework import routers

from .views import (
    ReservationModelViewSet, CompanyCreateAPIView, 
    CompanyModelViewSet, SubscriptionTypeModelViewSet, 
    CompanyUserModelViewSet, DefaultCurrencyModelViewSet,
    CurrencyModelViewSet, DefaultCarTypeModelViewSet,
    CarTypeModelViewSet, CarModelViewSet, DefaultExpenseTypeModelViewSet,
    ExpenseTypeModelViewSet, ExpenseModelViewSet, DriverModelViewSet,
    SubscriptionModelViewSet
)


app_name = 'company'

router = routers.DefaultRouter()
router.register(r'reservations', ReservationModelViewSet)
router.register(r'companies', CompanyModelViewSet)
router.register(r'users', CompanyUserModelViewSet)
router.register(r'defaultcurrencies', DefaultCurrencyModelViewSet)
router.register(r'currencies', CurrencyModelViewSet)
router.register(r'defaultcartypes', DefaultCarTypeModelViewSet)
router.register(r'cartypes', CarTypeModelViewSet)
router.register(r'cars', CarModelViewSet)
router.register(r'defaultexpensetypes', DefaultExpenseTypeModelViewSet)
router.register(r'expensetypes', ExpenseTypeModelViewSet)
router.register(r'expenses', ExpenseModelViewSet)
router.register(r'drivers', DriverModelViewSet)
router.register(r'subscriptiontypes', SubscriptionTypeModelViewSet)
router.register(r'subscriptions', SubscriptionModelViewSet)


urlpatterns = [
    path('', include(router.urls)),

    path('trial/create/', CompanyCreateAPIView.as_view(), name='company-trial-create'),
]
