from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .serializers import (
    DriverSerializer,
    TruckSerializer,
    ParkingRecordSerializer,
    WarehouseSerializer,
)
from .models import User, Driver, Truck, ParkingRecord, Warehouse, ParkingLot
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


class ParkingRecordAPI(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = ParkingRecord.objects.all()
    serializer_class = ParkingRecordSerializer

class AddTruck(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        truck = TruckSerializer(data=data)
        

class ParkingRecordInsertAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        source = request.user.manager.warehouse_id
        data["point_of_origin"] = source.id
        parking_lot_available = ParkingLot.objects.filter(
            warehouse=data["destination"], truck=None
        )
        data["parking_lot"] = parking_lot_available[0].id
        print(data)
        parking_record = ParkingRecordSerializer(data=data)
        if parking_record.is_valid():
            parking_record.save()
            return Response(parking_record.data, status=201)
        return Response(parking_record.errors, status=400)


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

class ManagerAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user.username
        user = get_object_or_404(User, username=username)
        print(user)
        user_details = {
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        print(user_details)
        return JsonResponse(user_details)
