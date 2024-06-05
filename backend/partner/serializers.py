from rest_framework import serializers

from .models import Agency, Taseron


class AgencyModelSerializer(serializers.ModelSerializer):
    benim_borcum = serializers.SerializerMethodField()
    bana_borcu = serializers.SerializerMethodField()

    class Meta:
        model = Agency
        fields = '__all__'
    
    def get_benim_borcum(self, obj):
        return obj.benim_borcum

    def get_bana_borcu(self, obj):
        return obj.bana_borcu


class TaseronModelSerializer(serializers.ModelSerializer):
    benim_borcum = serializers.SerializerMethodField()
    bana_borcu = serializers.SerializerMethodField()
    
    class Meta:
        model = Taseron
        fields = '__all__'
    
    def get_benim_borcum(self, obj):
        return obj.benim_borcum
    
    def get_bana_borcu(self, obj):
        return obj.bana_borcu