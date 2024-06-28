from django.db.utils import IntegrityError
from rest_framework.views import exception_handler
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound

def custom_exception_handler(exc, context):
    """
    Custom exception handler that ensures exceptions are converted to JSON data
    with appropriate status codes and error messages.

    Args:
        exc (Exception): The exception that was raised.
        context (dict): A dictionary containing additional context information
                        about the request.

    Returns:
        Response: A JSON response containing the error details.
    """

    # Pass through existing exception handlers (e.g., global middleware)
    response = exception_handler(exc, context)
    print('inside custom_exception_handler')
    # If no existing handler was found, handle it here
    # if response is not None:
        # Check for specific exceptions (optional)

    if response:
        if isinstance(exc, ValidationError):
            print('inside isinstance(exc, ValidationError):')
            # Handle validation errors gracefully
            errors = exc.detail
            errors['HATA'] = 'Girilen bilgilerde hata(lar) var. Lütfen bilgileri kontrol edin.'
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(exc, IntegrityError):
            print('inside isinstance(exc, IntegrityError):')
            # Handle database integrity errors
            # errors = exc.detail
            print(exc)
            errors = {'HATA': 'Bir hata oluştu. Lütfen bilgileri kontrol edin.'}  # User-friendly message
            errors['Hata detayı'] = exc.args[0]  # Actual error message
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(exc, NotFound):
            print('inside isinstance(exc, NotFound)')
            # Handle database integrity errors
            # errors = exc.detail
            print(exc)
            errors = {'HATA': 'Böyle bir bilgi bulunamadı.'}  # User-friendly message
            errors['Hata detayı'] = exc.args[0]  # Actual error message
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            print('inside else:')
            # Handle other exceptions generically
            # You might want to log the exception here for debugging
            print('response:', response)
            print('dir(response):', dir(response))
            print('exc:', exc)
            print('context:', context)
            if response:
                return Response({'error': str(response.data) + str(response.get('status_text'))}, status=response.status_code)
            else:
                return Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
