from rest_framework.serializers import ModelSerializer
from .models import Driver, Truck, ParkingRecord, Warehouse


class DriverSerializer(ModelSerializer):
    class Meta:
        model = Driver
        fields = "__all__"


class TruckSerializer(ModelSerializer):
    class Meta:
        model = Truck
        fields = "__all__"


class ParkingRecordSerializer(ModelSerializer):
    class Meta:
        model = ParkingRecord
        fields = "__all__"


class WarehouseSerializer(ModelSerializer):
    class Meta:
        model = Warehouse
        fields = "__all__"
