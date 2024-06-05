from django.shortcuts import render

from rest_framework import viewsets

from .models import Agency, Taseron
from .serializers import AgencyModelSerializer, TaseronModelSerializer


class AgencyModelViewSet(viewsets.ModelViewSet):
    queryset = Agency.objects.all()
    serializer_class = AgencyModelSerializer


class TaseronModelViewSet(viewsets.ModelViewSet):
    queryset = Taseron.objects.all()
    serializer_class = TaseronModelSerializer