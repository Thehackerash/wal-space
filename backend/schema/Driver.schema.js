import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    hiredDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  });
  
const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
