# Generated by Django 4.2 on 2024-06-13 14:03

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0004_rename_comission_reservation_agency_comission_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='car_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='company.cartype'),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='currency',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='company.currency'),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='dest_full',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='dest_short',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='flight_number',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='is_my_driver',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='passenger_count',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='passenger_name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='pickup_full',
            field=models.CharField(blank=True, max_length=1024, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='pickup_short',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='reservation_date',
            field=models.DateField(default=datetime.date(2024, 6, 13)),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='transfer_date',
            field=models.DateField(blank=True, default=datetime.date(2024, 6, 13), null=True),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='transfer_time',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
