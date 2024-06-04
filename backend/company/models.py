from django.utils import timezone
from django.db import models

from partner.models import Agency, Taseron


class Reservation(models.Model):

    TRANSFER_TYPE_CHOICES = (
        ('ARR', 'Arrival'),
        ('DEP', 'Departure'),
        ('ARA', 'Ara Transfer'),
        ('TUR', 'Tur'),
    )

    agency = models.ForeignKey(Agency, on_delete=models.CASCADE)
    is_nakit = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING)
    comission = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    reservation_date = models.DateField(default=timezone.now().date())
    transfer_type = models.CharField(max_length=50, choices=TRANSFER_TYPE_CHOICES, default='ARR')
    car_type = models.ForeignKey('CarType', on_delete=models.CASCADE)
    transfer_date = models.DateField(default=timezone.now().date())
    transfer_time = models.CharField(max_length=25)
    flight_number = models.CharField(max_length=25)

    passenger_name = models.CharField(max_length=255)
    passenger_count = models.IntegerField(default=1)
    note = models.TextField(blank=True, null=True)

    pickup_short = models.CharField(max_length=255)
    pickup_full = models.CharField(max_length=1024)
    dest_short = models.CharField(max_length=255)
    dest_full = models.CharField(max_length=1024)

    is_my_driver = models.BooleanField(default=True)
    my_driver = models.ForeignKey('Driver', on_delete=models.DO_NOTHING, blank=True, null=True)
    car = models.ForeignKey('Car', on_delete=models.CASCADE)

    taseron = models.ForeignKey(Taseron, on_delete=models.DO_NOTHING, blank=True, null=True)
    taseron_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    taseron_currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING, related_name='taseron_currency')


class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=255)


class CarType(models.Model):
    name = models.CharField(max_length=255)


class Car(models.Model):
    plate = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)


class Driver(models.Model):
    name = models.CharField(max_length=255)


class Expense(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING)
