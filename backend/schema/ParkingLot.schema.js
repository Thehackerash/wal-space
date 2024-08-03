const mongoose = require('mongoose');

const ParkingLotSchema = new mongoose.Schema({
  capacity: { type: Number, required: true }, // Total number of parking spaces
  currentOccupancy: { type: Number, default: 0 }, // Number of occupied spaces
  trucks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck'
  }],
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
});

const ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);
module.exports = ParkingLot;
