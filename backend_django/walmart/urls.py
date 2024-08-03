from django.contrib import admin
from django.urls import path
from .views import home, DriverAPI, DriverDetailAPI, TruckAPI, TruckDetailAPI

urlpatterns = [
    path("", home, name="home"),
    path("drivers/", DriverAPI.as_view(), name="driver_list"),
    path("drivers/<int:pk>/", DriverDetailAPI.as_view(), name="driver_detail"),
    path("truck/", TruckAPI.as_view(), name="truck_list"),
    path("truck/<int:pk>/", TruckDetailAPI.as_view(), name="truck_detail"),
]
