# Generated by Django 4.2 on 2024-06-24 12:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0011_defaultexpensetype_remove_defaultcartype_company_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='expense_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='company.expensetype'),
            preserve_default=False,
        ),
    ]
