# Generated by Django 4.2 on 2024-06-05 05:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0002_alter_reservation_reservation_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='car',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='company.car'),
        ),
    ]
