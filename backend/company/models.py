from django.utils import timezone
from django.db import models

from partner.models import Agency, Taseron


class Company(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class Reservation(models.Model):

    TRANSFER_TYPE_CHOICES = (
        ('ARR', 'Arrival'),
        ('DEP', 'Departure'),
        ('ARA', 'Ara Transfer'),
        ('TUR', 'Tur'),
    )

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    agency = models.ForeignKey(Agency, on_delete=models.CASCADE)
    is_nakit = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING, null=True, blank=True)
    agency_comission = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    reservation_date = models.DateField(default=timezone.now().date())
    transfer_type = models.CharField(max_length=50, choices=TRANSFER_TYPE_CHOICES, default='ARR')
    car_type = models.ForeignKey('CarType', on_delete=models.CASCADE, null=True, blank=True)
    transfer_date = models.DateField(default=timezone.now().date(), null=True, blank=True)
    transfer_time = models.CharField(max_length=25, null=True, blank=True)
    flight_number = models.CharField(max_length=25, null=True, blank=True)

    passenger_name = models.CharField(max_length=255, null=True, blank=True)
    passenger_count = models.IntegerField(default=1, null=True, blank=True)
    note = models.TextField(blank=True, null=True)

    pickup_short = models.CharField(max_length=255, null=True, blank=True)
    pickup_full = models.CharField(max_length=1024, null=True, blank=True)
    dest_short = models.CharField(max_length=255, null=True, blank=True)
    dest_full = models.CharField(max_length=1024, null=True, blank=True)

    is_my_driver = models.BooleanField(default=True, null=True, blank=True)
    my_driver = models.ForeignKey('Driver', on_delete=models.DO_NOTHING, blank=True, null=True)
    car = models.ForeignKey('Car', on_delete=models.CASCADE, blank=True, null=True)

    taseron = models.ForeignKey(Taseron, on_delete=models.DO_NOTHING, blank=True, null=True)
    taseron_hakedis = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    taseron_currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING, related_name='taseron_currency', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.transfer_date} - [{self.pickup_short}-{self.dest_short}] - {self.transfer_time} , Nakit={self.is_nakit}"


class DefaultCurrency(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.code
    

class DefaultCarType(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    

class DefaultExpenseType(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"ExpenseType: {self.name}"
    

class Currency(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.code


class CarType(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name


class Car(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    plate = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"{self.plate} - {self.brand}-{self.model}"


class Driver(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ExpenseType(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"ExpenseType: {self.name}"
    

class Expense(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    expense_type = models.ForeignKey(ExpenseType, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    currency = models.ForeignKey('Currency', on_delete=models.DO_NOTHING)

    def __str__(self):
        return f"{self.expense_type} - {self.amount} {self.currency}"



class SubscriptionType(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price_month = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    price_year = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Subscription: {self.name}"
    

class Subscription(models.Model):
    STATUS_CHOICES = (
        ('TRIAL', 'Deneme'), 
        ('ACTIVE', 'Aktif'),
        ('ENDED', 'Bitti')
    )
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    subscription_type = models.ForeignKey(SubscriptionType, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='TRIAL')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Subscription for {self.company.name}:{self.subscription_type.name}"