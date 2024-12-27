const { ObjectId } = require('mongodb');
const UserModel = require('../models/User'); // Ensure the path is correct

class MiningService {
  /**
   * Starts the mining process for a given user.
   * 
   * @param {string} userId - The user ID as a string.
   * @param {number} miningDuration - The duration of mining (positive integer).
   * @returns {number} - The number of mined points.
   */
  static async startMining(userId, miningDuration) {
    try {
      // Validate the userId (ensure it's a valid ObjectId)
      if (!ObjectId.isValid(userId)) { 
        throw new Error('Invalid user ID format: Must be a valid ObjectId.'); 
      }

      // Convert userId to ObjectId
      const userIdObjectId = new ObjectId(userId); 

      // Find the user by ID
      const user = await UserModel.findById(userIdObjectId);
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate mined points (example: 10 points per duration unit)
      const minedPoints = miningDuration * 10; 

      // Update the user's balance with mined points
      const updatedUser = await UserModel.findByIdAndUpdate(
        userIdObjectId,
        { $inc: { balance: minedPoints } }, // Increment balance field
        { new: true } // Return the updated user document
      );

      if (!updatedUser) {
        throw new Error('Failed to update user balance');
      }

      return minedPoints; // Return mined points
    } catch (error) {
      console.error('Error in startMining:', error.message || error);
      throw error; // Re-throw the error for higher-level handling
    }
  }

  /**
   * Fetches the balance for a given user.
   * @param {string} userId - The user ID as a string.
   * @returns {number} - The user's balance.
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

      return user.balance; // Return the balance
    } catch (error) {
      console.error('Error in getBalance:', error.message || error);
      throw error;
    }
  }
}

module.exports = MiningService;
