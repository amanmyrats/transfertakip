from django.shortcuts import render

from rest_framework import viewsets

from .models import (
    Reservation, 
)
from .serializers import (
    ReservationModelSerializer, 
)

class ReservationModelViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationModelSerializer
