from rest_framework import serializers

from .models import Reservation


class ReservationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'