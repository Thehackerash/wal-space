import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const ManagerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true }, // Unique identifier for login (e.g., username or employee ID)
  password: { type: String, required: true }, // Hashed password for login
  warehouses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse'
  }]
});

// Middleware to hash password before saving
ManagerSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Method to compare password for login
ManagerSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Manager = mongoose.model('Manager', ManagerSchema);
module.exports = Manager;
