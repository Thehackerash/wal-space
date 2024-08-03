from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Driver, Inventory, Manager, ParkingLot, Truck, Warehouse

admin.site.unregister(User)


class ManagerInline(admin.TabularInline):
    model = Manager


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    inlines = (ManagerInline,)


admin.site.register(Driver)
admin.site.register(Inventory)
admin.site.register(ParkingLot)
admin.site.register(Truck)
admin.site.register(Warehouse)
