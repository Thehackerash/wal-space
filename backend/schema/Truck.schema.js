import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  driverName: { type: String, required: true },
  driverContact: { type: String, required: true },
  status: { type: String, enum: ['incoming', 'outgoing', 'waiting', 'docked'], default: 'waiting' },
  arrivalTime: { type: Date, default: Date.now },
  departureTime: { type: Date }
});

const Truck = mongoose.model('Truck', TruckSchema);
module.exports = Truck;
