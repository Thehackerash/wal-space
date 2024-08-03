import mongoose from 'mongoose';

const ParkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  capacity: { type: Number, required: true }, // Total number of parking spaces
  currentOccupancy: { type: Number, default: 0 }, // Number of occupied spaces
  trucks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck'
  }],
  operationalStatus: { type: String, enum: ['operational', 'closed'], default: 'operational' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);
module.exports = ParkingLot;
