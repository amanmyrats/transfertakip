from django.urls import path, include
from rest_framework import routers

from .views import (
    ReservationModelViewSet,
)


router = routers.DefaultRouter()
router.register(r'reservations', ReservationModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
