# Generated by Django 4.2 on 2024-06-22 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_account_managers_account_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]
