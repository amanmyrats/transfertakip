from django_filters import rest_framework as filters

from .models import Reservation


class ReservationFilterSet(filters.FilterSet):
    class Meta:
        model = Reservation
        fields = '__all__'