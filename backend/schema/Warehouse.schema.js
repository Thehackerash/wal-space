import mongoose from 'mongoose';

const WarehouseSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  capacity: { type: Number, required: true }, // Capacity in terms of storage units
  currentOccupancy: { type: Number, default: 0 }, // Current number of occupied storage units
  manager: {
    name: { type: String, required: true },
    contact: { type: String, required: true }
  },
  inventory: [{
    item: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    lastRestocked: { type: Date, default: Date.now }
  }],
  operationalStatus: { type: String, enum: ['operational', 'under_maintenance', 'closed'], default: 'operational' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
module.exports = Warehouse;
