from django.contrib import admin
from django.urls import path
from .views import (
    home,
    ManagerAPI,
    DriverAPI,
    DriverDetailAPI,
    TruckAPI,
    TruckDetailAPI,
    ParkingRecordAPI,
    BookingDetails,
    ParkingRecordInsertAPI,
    gen_qr_code,
)

urlpatterns = [
    path("", home, name="home"),
    path("manager/", ManagerAPI.as_view(), name="manager_list"),
    path("drivers/", DriverAPI.as_view(), name="driver_list"),
    path("drivers/<int:pk>/", DriverDetailAPI.as_view(), name="driver_detail"),
    path("truck/", TruckAPI.as_view(), name="truck_list"),
    path("truck/<int:pk>/", TruckDetailAPI.as_view(), name="truck_detail"),
    path("parking-record/", ParkingRecordAPI.as_view(), name="parking_record_list"),
    path("booking/", BookingDetails.as_view(), name="booking_details"),
    path(
        "parking-record/insert/",
        ParkingRecordInsertAPI.as_view(),
        name="parking_record_insert",
    ),
    path("record/", gen_qr_code.as_view(), name="booking_details"),
]
