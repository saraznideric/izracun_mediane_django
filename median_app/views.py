from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Median
from .serializers import MedianSerializer
import statistics
from django.db.models import Avg
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import filters
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.


class CalculateMedian(APIView):

    def post(self, request):
        values = request.data.get('data')
        median_value = calculate_median_value(values)
        median = Median.objects.create(value=median_value)
        serializer = MedianSerializer(median)
        return Response(serializer.data)



class GetMedian(ListAPIView):
    queryset = Median.objects.all().order_by('-created_at')
    serializer_class = MedianSerializer


def calculate_median_value(values):
    values = sorted(values)
    n = len(values)
    if n % 2 == 0:
        return (values[n//2-1] + values[n//2]) / 2
    else:
        return values[n//2]

## @api_view(['POST'])
# def calculate_median(request):
#     values = request.data
#     median_value = calculate_median_value(values)
#     median = Median.objects.create(value=median_value)
#     serializer = MedianSerializer(median)
#     return JsonResponse(serializer.data)
#
#
#
# @api_view(['GET'])
# def get_median(request):
#     medians = Median.objects.all().order_by('-created_at')
#     serializer = MedianSerializer(medians, many=True)
#     return JsonResponse(serializer.data, safe=False)