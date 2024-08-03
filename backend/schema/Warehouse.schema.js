import mongoose from 'mongoose';

const WarehouseSchema = new mongoose.Schema({
  id: { type: String, required: true },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true
  },
  inventory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inventory'
  }],
  operationalStatus: { type: String, enum: ['operational', 'under_maintenance', 'closed'], default: 'operational' },
});

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
export default Warehouse;
