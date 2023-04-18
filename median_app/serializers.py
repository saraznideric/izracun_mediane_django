from rest_framework import serializers
from .models import Median

class MedianSerializer(serializers.ModelSerializer):
    MEDIANA = serializers.DecimalField(source='value', max_digits=12, decimal_places=6)

    class Meta:
        model = Median
        fields = ('created_at', 'value', 'MEDIANA')
