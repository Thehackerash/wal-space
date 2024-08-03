from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User


class Driver(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    contact = models.CharField(max_length=255, null=False, blank=False)
    license_id = models.CharField(max_length=255, unique=True, null=False, blank=False)
    street = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=255, null=False, blank=False)
    state = models.CharField(max_length=255, null=False, blank=False)
    zip_code = models.CharField(max_length=255, null=False, blank=False)
    country = models.CharField(max_length=255, null=False, blank=False)

    def __str__(self):
        return self.name


class Warehouse(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    address = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=255, null=False, blank=False)
    state = models.CharField(max_length=255, null=False, blank=False)
    zip_code = models.CharField(max_length=255, null=False, blank=False)
    country = models.CharField(max_length=255, null=False, blank=False)
    capacity = models.IntegerField(null=False, blank=False)
    current_occupancy = models.IntegerField(default=0)
    parking_capacity = models.IntegerField(null=False, blank=False)
    operational_status = models.CharField(
        max_length=20,
        choices=[
            ("operational", "Operational"),
            ("under_maintenance", "Under Maintenance"),
            ("closed", "Closed"),
        ],
        default="operational",
    )


class Inventory(models.Model):
    item_name = models.CharField(max_length=255, null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    category = models.CharField(max_length=255, null=False, blank=False)
    warehouse = models.ForeignKey(
        Warehouse, related_name="inventory", on_delete=models.CASCADE
    )
    last_restocked = models.DateTimeField(default=timezone.now)


class Truck(models.Model):
    license_plate = models.CharField(
        max_length=255, unique=True, null=False, blank=False
    )
    weight = models.IntegerField(null=False, blank=False)
    status = models.CharField(
        max_length=20,
        choices=[
            ("incoming", "Incoming"),
            ("outgoing", "Outgoing"),
            ("waiting", "Waiting"),
            ("docked", "Docked"),
        ],
        default="waiting",
    )


class ParkingRecord(models.Model):
    truck_id = models.ForeignKey(Truck, on_delete=models.CASCADE)
    driver_id = models.ForeignKey(Driver, on_delete=models.CASCADE)
    arrival_time = models.DateTimeField(default=timezone.now)
    departure_time = models.DateTimeField(null=True, blank=True)
    parking_lot = models.ForeignKey("ParkingLot", on_delete=models.CASCADE)
    weight = models.IntegerField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    point_of_origin = models.ForeignKey(
        Warehouse, on_delete=models.CASCADE, related_name="origin_records"
    )
    destination = models.ForeignKey(
        Warehouse, on_delete=models.CASCADE, related_name="destination_records"
    )


class ParkingLot(models.Model):
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="parking_lots",
        blank=True,
        null=True,
    )
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)


class Manager(models.Model):
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
