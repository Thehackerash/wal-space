import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  lastRestocked: { type: Date, default: Date.now }
});

const Inventory = mongoose.model('Inventory', InventorySchema);
export default Inventory;
