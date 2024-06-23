from django.urls import path, include
from rest_framework import routers

from .views import (
    ReservationModelViewSet, CompanyCreateAPIView, 
    CompanyModelViewSet, SubscriptionTypeModelViewSet
)


app_name = 'company'

router = routers.DefaultRouter()
router.register(r'reservations', ReservationModelViewSet)
router.register(r'companies', CompanyModelViewSet)
router.register(r'subscriptiontypes', SubscriptionTypeModelViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('trial/create/', CompanyCreateAPIView.as_view(), name='company-trial-create'),
]
