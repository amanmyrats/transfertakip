from django.urls import path, include

from rest_framework import routers

from .views import AccountModelViewSet, RoleModelViewSet, AccountRoleModelViewSet


router = routers.DefaultRouter()
router.register(r'accounts', AccountModelViewSet)
router.register(r'roles', RoleModelViewSet)
router.register(r'accountroles', AccountRoleModelViewSet)

urlpatterns = [
    path('', include(router.urls)),
]