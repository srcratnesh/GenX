const express = require('express');
const router = express.Router();
const MiningService = require('../services/MiningService'); // Import your mining service logic

/**
 * @route   GET /api/mining/balance/:userId
 * @desc    Fetch user mining balance
 * @access  Public
 */
router.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
  }

  try {
    // Fetch balance using the MiningService
    const balance = await MiningService.getBalance(userId);

    if (balance === null || balance === undefined) {
      return res.status(404).json({ message: 'User not found or balance unavailable.' });
    }

    // Respond with the balance
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching user balance:', error); // Log error details for debugging
    res.status(500).json({ message: 'An error occurred while fetching balance. Please try again later.' });
  }
});

/**
 * @route   POST /api/mining/start
 * @desc    Start the mining process
 * @access  Public
 */
router.post('/start', async (req, res) => {
  const { userId, miningDuration = 1 } = req.body; // Default miningDuration is 1

  // Validate userId
  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
  }

  // Validate miningDuration
  if (miningDuration <= 0 || !Number.isInteger(miningDuration)) {
    return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
  }

  try {
    // Start the mining process
    const minedPoints = await MiningService.startMining(userId, miningDuration);

    if (minedPoints === null || minedPoints === undefined) {
      return res.status(404).json({ message: 'Mining failed. User not found or invalid data.' });
    }

    // Respond with the mined points
    res.status(200).json({ minedPoints });
  } catch (error) {
    console.error('Error during mining process:', error); // Log error details for debugging
    if (error.message) {
      return res.status(500).json({ message: error.message });
    }
    res.status(500).json({ message: 'An error occurred during the mining process. Please try again later.' });
  }
});

module.exports = router;
