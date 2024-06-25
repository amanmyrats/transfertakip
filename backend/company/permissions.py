from rest_framework.permissions import (
    BasePermission, IsAuthenticated, IsAdminUser
) 
    

from accounts.models import AccountRole


class IsCompanyOwner(IsAuthenticated, IsAdminUser, BasePermission):
    """
    Permission class to restrict access to company owners for objects belonging to their company.
    """
    
    def has_permission(self, request, view):
        # Check for authentication and is_owner flag
        if not request.user.is_owner:
            return False
        return True  # Allow all actions for company owners (subject to object-level check)

    def has_object_permission(self, request, view, obj):
        user = request.user
        # Check if user's company matches the object's company
        if not hasattr(obj, 'company') or obj.company != user.company:
            return False
        return True


class IsCompanyAdmin(IsCompanyOwner):
    """
    Permission class to restrict access to company admins for objects belonging to their company.
    """

    def has_permission(self, request, view):
        # Check for authentication and company_admin role
        if not AccountRole.objects.filter(
            account=request.user, role__role_name='company_admin'
        ).exists():
            return False
        return True  # Allow all actions for company admins (subject to object-level check)

    def has_object_permission(self, request, view, obj):
        user = request.user
        # Check if user's company matches the object's company
        if not hasattr(obj, 'company') or obj.company != user.company:
            return False
        return True
    

class IsCompanyEmployeeReadOnly(IsCompanyAdmin):
    """
    Permission class to restrict access to company employees for objects belonging to their company.
    """

    def has_permission(self, request, view):
        # Only allow GET requests for company employees
        if request.method != 'GET':
            return False
        # Check for authentication and company_employee role
        if not AccountRole.objects.filter(
            account=request.user, role__role_name='company_employee'
        ).exists():
            return False
        return True  # Allow GET requests for company employees (subject to object-level check)


class IsCompanyDriverReadOnly(IsCompanyEmployeeReadOnly):
    """
    Permission class to restrict access to company drivers for objects belonging to their company.
    """

    def has_permission(self, request, view):
        # Only allow GET requests for company employees
        if request.method != 'GET':
            return False
        # Check for authentication and company_driver role
        if not AccountRole.objects.filter(
            account=request.user, role__role_name='company_driver'
        ).exists():
            return False
        return True  # Allow all actions for company drivers (subject to object-level check)
