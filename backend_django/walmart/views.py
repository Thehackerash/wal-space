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
from .models import User, Driver, Truck, ParkingRecord, Warehouse, ParkingLot, Manager
from rest_framework.views import APIView, View
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .utils import assign_parking_lot
from django.views.decorators.csrf import csrf_exempt
import json
import qrcode
import base64
from Crypto.Cipher import AES
from io import BytesIO
from django.core.exceptions import ObjectDoesNotExist
from io import BytesIO
from django.utils import timezone
from django.conf import settings
import os
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
    @csrf_exempt
    def post(self, request):
        data = request.data
        source = request.user.manager.warehouse_id
        # data["point_of_origin"] = source.id
        # parking_lot_available = ParkingLot.objects.filter(
        #     warehouse=data["destination"], truck=None
        # )
        # data["parking_lot"] = parking_lot_available[0].
        in_out=data["in_out"]
        in_out = "destination" if in_out == "incoming" else "source"
        parking_lot=ParkingLot.objects.filter(warehouse=data[in_out], truck=None).first()     
        data["parking_lot"] = parking_lot.id
        print(data)
        
         # Create and save the parking record
        parking_record = ParkingRecordSerializer(data=data)
        if parking_record.is_valid():
            parking_record.save()
            # Generate QR code
            qr_data = f'ID: {parking_record.data["id"]}, Truck ID: {data["truck_id"]}, Arrival Time: {timezone.now()}'
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(qr_data)
            qr.make(fit=True)
            img = qr.make_image(fill='black', back_color='white')
            buffer = BytesIO()
            img.save(buffer)
            buffer.seek(0)
            file_name = f'qr_code_{parking_record.data["id"]}.png'
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)

            # Save the QR code image
            img.save(file_path)

            # Construct the URL for accessing the QR code
            qr_code_url = os.path.join(settings.MEDIA_URL, file_name)
            # You can return the QR code image in the response if desired, or store it as a URL
            response = HttpResponse(buffer, content_type='image/png')
            response['Content-Disposition'] = 'attachment; filename="qr_code.png"'

            # Return QR code URL or QR code image directly
            return Response({
                'parking_record': parking_record.data,
                'qr_code_url': qr_code_url
            }, status=201)
        return Response(parking_record.errors, status=400)

class BookingDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user
        manager = Manager.objects.get(user=user)
        warehouse = manager.warehouse_id
        warehouse = WarehouseSerializer(warehouse).data
        warehouse_id = manager.warehouse_id.id
        destination = Warehouse.objects.all().exclude(id=warehouse_id)
        destination = WarehouseSerializer(destination, many=True).data
        truck = Truck.objects.all()
        driver = Driver.objects.all()
        return Response(
            {
                "booking": destination,
                "driver": DriverSerializer(driver, many=True).data,
                "truck": TruckSerializer(truck, many=True).data,
                "warehouse": warehouse,
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
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        print(user_details)
        return JsonResponse(user_details)


class TravelTime(View):
    def get(self, request, *args, **kwargs):
        pass


class QR_code(View):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = json.loads(request.body)
            parking_lot_id = assign_parking_lot()
            record = ParkingRecord(
                truck_id=Truck.objects.get(id=data["truck_id"]),
                driver_id=Driver.objects.get(id=data["driver_id"]),
                expected_arrival_time=data["expected_arrival_time"],
                parking_lot=ParkingLot.objects.get(id=parking_lot_id),
                weight=data["weight"],
                price=data["price"],
                source=data["source"],
                destination=data["destination"],
            )

            # Save the record to the database
            record.save()

            # Encrypt the data
            key = b"Sixteen byte key"  # Key must be 16, 24, or 32 bytes long
            cipher = AES.new(key, AES.MODE_EAX)
            nonce = cipher.nonce
            encrypted_data, tag = cipher.encrypt_and_digest(json.dumps(data).encode())

            # Generate QR code
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            qr.add_data(base64.b64encode(encrypted_data).decode("utf-8"))
            qr.make(fit=True)
            img = qr.make_image(fill="black", back_color="white")

            buffer = BytesIO()
            img.save(buffer)
            qr_image = base64.b64encode(buffer.getvalue()).decode("utf-8")

            return JsonResponse({"status": "success", "qr_code": qr_image})

        except KeyError as e:
            return JsonResponse(
                {"status": "error", "message": f"Missing key: {str(e)}"}, status=400
            )
        except ObjectDoesNotExist as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
