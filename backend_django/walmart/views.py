from django.shortcuts import render
from django.http import HttpResponse
from .serializers import (
    DriverSerializer,
    TruckSerializer,
    ParkingRecordSerializer,
    WarehouseSerializer,
)
from .models import Driver, Truck, ParkingRecord, Warehouse
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


class BookingDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        warehouse_id = user.manager.warehouse_id.id
        destination = Warehouse.objects.all().exclude(id=warehouse_id)
        destination = WarehouseSerializer(destination, many=True).data
        truck = Truck.objects.all()
        driver = Driver.objects.all()
        return Response(
            {
                "booking": destination,
                "driver": DriverSerializer(driver, many=True).data,
                "truck": TruckSerializer(truck, many=True).data,
            },
            status=200,
        )
