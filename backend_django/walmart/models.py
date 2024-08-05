from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


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
    def __str__(self):
        return self.name


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
    def __str__(self):
        return self.license_plate


class ParkingRecord(models.Model):
    truck_id = models.ForeignKey(Truck, on_delete=models.CASCADE)
    driver_id = models.ForeignKey(Driver, on_delete=models.CASCADE)
    expected_arrival_time = models.DateTimeField(default=timezone.now)
    arrival_time = models.DateTimeField(null=True, blank=True)
    departure_time = models.DateTimeField(null=True, blank=True)
    parking_lot = models.ForeignKey("ParkingLot", on_delete=models.CASCADE)
    weight = models.IntegerField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    source = models.CharField(max_length=255, null=False, blank=False)
    destination = models.CharField(max_length=255, null=False, blank=False)


class ParkingLot(models.Model):
    truck = models.ForeignKey(
        Truck,
        on_delete=models.CASCADE,
        related_name="parking_lots",
        blank=True,
        null=True,
    )
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    booked_times = ArrayField(
        models.DateTimeField(), default=list, blank=True
    )


class Manager(models.Model):
    warehouse_id = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
