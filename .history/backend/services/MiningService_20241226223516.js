const { ObjectId } = require('mongodb');
const UserModel = require('../models/User'); // Ensure the path is correct

class MiningService {
  static isValidObjectId(id) {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
  }

  /**
   * Starts the mining process for a given user.
   */
  static async startMining(userId, miningDuration) {
    try {
      // Validate the userId
      if (!this.isValidObjectId(userId)) {
        throw new Error('Invalid user ID format: Must be a valid ObjectId.');
      }

      const userIdObjectId = new ObjectId(userId);

      // Find user by ID
      const user = await UserModel.findById(userIdObjectId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate mined points
      const minedPoints = miningDuration * 10;

      // Update the user's balance
      const updatedUser = await UserModel.findByIdAndUpdate(
        userIdObjectId,
        { $inc: { balance: minedPoints } },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('Failed to update user balance');
      }

      return minedPoints;
    } catch (error) {
      console.error('Error in startMining:', error.message || error);
      throw error;
    }
  }

  /**
   * Fetches the balance for a given user.
   */
  static async getBalance(userId) {
    try {
      if (!this.isValidObjectId(userId)) {
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
