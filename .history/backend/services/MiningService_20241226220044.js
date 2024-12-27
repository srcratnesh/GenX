const { ObjectId } = require('mongodb'); // Import ObjectId
const UserModel = require('../models/UserModel'); // Import the user model (ensure this path is correct)

class MiningService {
  /**
   * Starts the mining process for a given user.
   * @param {string} userId - The user ID as a string.
   * @param {number} miningDuration - The duration of mining (positive integer).
   * @returns {number} - The number of mined points.
   */
  static async startMining(userId, miningDuration) {
    try {
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
}

module.exports = MiningService;
