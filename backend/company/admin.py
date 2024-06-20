from django.contrib import admin

from .models import (
    Reservation, Currency, Car, CarType, Driver, Expense, 
    SubscriptionType, Subscription
)


admin.site.register(Reservation)
admin.site.register(Currency)
admin.site.register(Car)
admin.site.register(CarType)
admin.site.register(Driver)
admin.site.register(Expense)
admin.site.register(SubscriptionType)
admin.site.register(Subscription)
