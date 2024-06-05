from django.urls import path, include

from rest_framework import routers

from .views import AgencyModelViewSet, TaseronModelViewSet


app_name = 'partner'

router = routers.DefaultRouter()
router.register(r'agencies', AgencyModelViewSet)
router.register(r'taserons', TaseronModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
