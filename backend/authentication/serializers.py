from rest_framework_simplejwt.serializers import TokenUserSerializer


class CustomTokenUserSerializer(TokenUserSerializer):
    def get_user_details(self, user):
        user_data = super().get_user_details(user)
        user_data['user_id'] = user.id  # Add user ID to the data
        return user_data
