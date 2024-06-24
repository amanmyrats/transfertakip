from django.shortcuts import render

from rest_framework import viewsets, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from accounts.models import Account
from .serializers import (
    AccountModelSerializer, ChangePasswordSerializer, ProfileSerializer
)


class AccountModelViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'changepassword':
            return ChangePasswordSerializer
        return AccountModelSerializer

    @action(detail=False, methods=['post'], url_path='changepassword')
    def changepassword(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            confirm_password = serializer.validated_data['confirm_password']
            if new_password != confirm_password:
                return Response({'status': 'Yeni şifrenizi iki yere de doğru yazmanız gerekiyorç'}, status=status.HTTP_400_BAD_REQUEST)
            if user.check_password(old_password):
                user.set_password(new_password)
                user.save()
                return Response({'status': 'Şifreniz başarıyla değiştirildi.'})
            else:
                return Response({'status': 'Şuanda kullandığınız şifreyi hatalı yazdınız.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class ProfileAPIView(views.APIView):
    def put(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)