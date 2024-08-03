import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  licenseId: { type: String, required: true, unique: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true }
  }
});

const Driver = mongoose.model('Driver', DriverSchema);
export default Driver;
