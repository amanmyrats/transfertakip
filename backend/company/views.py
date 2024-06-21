from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CompanyCreateSerializer
from .models import (
    Reservation, Company
)
from .serializers import (
    ReservationModelSerializer, CompanyModelSerializer
)

class ReservationModelViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationModelSerializer


class CompanyModelViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanyModelSerializer

class CompanyCreateAPIView(APIView):
    """
    API endpoint for creating a new company with an owner and subscription.
    """

    def post(self, request):
        serializer = CompanyCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_data = serializer.validated_data
        company = serializer.save()  # Saves the company first

        return Response(serializer.data, status=status.HTTP_201_CREATED)
