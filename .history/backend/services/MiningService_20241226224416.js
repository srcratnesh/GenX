const { ObjectId } = require('mongodb');
const UserModel = require('../models/User');

class MiningService {
  static async startMining(userId, miningDuration) {
    try {
      console.log('startMining - Received userId:', userId); // Log received userId
      console.log('startMining - Received miningDuration:', miningDuration); // Log received duration

      // Validate the userId
      if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format: Must be a valid ObjectId.');
      }

      const userIdObjectId = new ObjectId(userId);

      // Fetch user from the database
      const user = await UserModel.findById(userIdObjectId);
      if (!user) {
        throw new Error('User not found');
      }

      const minedPoints = miningDuration * 10; // Calculate points

      // Update user balance
      const updatedUser = await UserModel.findByIdAndUpdate(
        userIdObjectId,
        { $inc: { balance: minedPoints } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('Failed to update user balance');
      }

      console.log('Mined Points:', minedPoints);
      return minedPoints;
    } catch (error) {
      console.error('Error in startMining:', error.message || error);
      throw error;
    }
  }

  static async getBalance(userId) {
    try {
      console.log('getBalance - Received userId:', userId);

      if (!ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID format');
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      return user.balance;
    } catch (error) {
      console.error('Error in getBalance:', error.message || error);
      throw error;
    }
  }
}

module.exports = MiningService;
