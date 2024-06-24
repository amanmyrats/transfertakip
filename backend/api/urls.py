from django.urls import path, include


urlpatterns = [
    path('v1/company/', include('company.urls')),
    path('v1/partner/', include('partner.urls')),
    path('v1/accounts/', include('accounts.urls')),
]
