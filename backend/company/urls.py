from django.urls import path, include
from rest_framework import routers

from .views import (
    ReservationModelViewSet, CompanyCreateAPIView, 
    CompanyModelViewSet
)


app_name = 'company'

router = routers.DefaultRouter()
router.register(r'reservations', ReservationModelViewSet)
router.register(r'companies', ReservationModelViewSet)

urlpatterns = [
    path('', include(router.urls)),

    path('trial/create/', CompanyCreateAPIView.as_view(), name='company-trial-create'),
]
