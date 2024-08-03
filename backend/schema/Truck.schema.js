import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  status: { type: String, enum: ['incoming', 'outgoing', 'waiting', 'docked'], default: 'waiting' },
  arrivalTime: { type: Date, default: Date.now },
  departureTime: { type: Date },
  parkingLot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingLot',
    required: true
  }
});

const Truck = mongoose.model('Truck', TruckSchema);
export default Truck;
