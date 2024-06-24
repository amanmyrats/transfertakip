from django.urls import path, include

from rest_framework import routers

from .views import AccountModelViewSet


router = routers.DefaultRouter()
router.register(r'accounts', AccountModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]