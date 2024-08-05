from .models import ParkingLot
from django.utils import timezone
import datetime

def assign_parking_lot(start_time):
    end_time = start_time + datetime.timedelta(hours=1)
    
    for parking_lot in ParkingLot.objects.all():
        if is_time_slot_available(parking_lot, start_time):
            parking_lot.booked_times.extend([
                start_time,
                end_time
            ])
            parking_lot.save()
            return parking_lot
    raise ValueError("No free parking lots available for the given time slot")

def is_time_slot_available(parking_lot, start_time):
    end_time = start_time + datetime.timedelta(hours=1)
    booked_times = parking_lot.booked_times
    
    # Check in pairs of start and end times
    for i in range(0, len(booked_times), 2):
        booked_start = booked_times[i]
        booked_end = booked_times[i + 1]
        if not (end_time <= booked_start or start_time >= booked_end):
            return False
    return True