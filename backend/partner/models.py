from django.db import models
from django.db.models import Sum


class Agency(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    @property
    def benim_borcum(self, *args, **kwargs):
        from company.models import Reservation
        nakit_reservations = Reservation.objects.filter(agency=self, is_nakit=True)
        komisyon_total = nakit_reservations.aggregate(komisyon_total=Sum('agency_comission'))['komisyon_total']
        if komisyon_total:
            return komisyon_total
        return 0
    
    @property
    def bana_borcu(self, *args, **kwargs):
        from company.models import Reservation
        cari_reservations = Reservation.objects.filter(agency=self, is_nakit=False)
        cari_total = cari_reservations.aggregate(cari_total=Sum('amount'))['cari_total']
        if cari_total:
            return cari_total
        return 0
    

class Taseron(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    @property
    def bana_borcu(self, *args, **kwargs):
        from company.models import Reservation
        nakit_reservations = Reservation.objects.filter(taseron=self, is_nakit=True)
        nakit_total = nakit_reservations.aggregate(nakit_total=Sum('amount'))['nakit_total']
        if nakit_total:
            return nakit_total
        return 0
    
    @property
    def benim_borcum(self, *args, **kwargs):
        from company.models import Reservation
        reservations = Reservation.objects.filter(taseron=self)
        taseron_hakedis_total = reservations.aggregate(taseron_hakedis_total=Sum('taseron_hakedis'))['taseron_hakedis_total']
        if taseron_hakedis_total:
            return taseron_hakedis_total
        return 0
    
