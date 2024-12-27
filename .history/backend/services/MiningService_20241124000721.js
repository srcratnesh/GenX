const mongoose = require('mongoose');
const User = require('../models/User'); // Ensure this line is declared only once

// Fetch user balance
const getBalance = async (userId) => {
  // Convert userId to ObjectId if it's a string
  const objectId = mongoose.Types.ObjectId(userId);

  const user = await User.findById(objectId);
  if (!user) throw new Error('User not found');
  return user.balance;
};

// Start mining with a fixed increment of 0.15 points
const startMining = async (userId) => {
  // Convert userId to ObjectId if it's a string
  const objectId = mongoose.Types.ObjectId(userId);

  const user = await User.findById(objectId);
  if (!user) throw new Error('User not found');

  const minedPoints = 0.15; // Fixed mined points
  user.balance = parseFloat((user.balance + minedPoints).toFixed(2)); // Ensure numeric value to avoid NaN
  await user.save();

  return minedPoints;
};

module.exports = { getBalance, startMining };
