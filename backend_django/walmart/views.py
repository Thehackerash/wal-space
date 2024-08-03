from django.shortcuts import render
from django.http import HttpResponse
from .serializers import DriverSerializer, TruckSerializer,ParkingRecordSerializer
from .models import Driver, Truck, ParkingRecord
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Create your views here.
def home(request):
    return HttpResponse("Hello, World!")


class DriverAPI(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class DriverDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer


class TruckAPI(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class TruckDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class ParkingRecordAPI(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ParkingRecord.objects.all()
    serializer_class = ParkingRecordSerializer

