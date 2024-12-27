const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, unique: true },
  isVerified: { type: Boolean, default: false },
  minedPoints: { type: Number, default: 0 },
  activityLog: { type: Array, default: [] },
  notifications: { type: Array, default: [] },
  preferences: {
    referralBonus: { type: Number, default: 0 },
    referralsMade: { type: Number, default: 0 },
    todaysEarnings: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('User', userSchema);
