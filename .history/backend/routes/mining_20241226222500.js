const express = require('express');
const router = express.Router();
const MiningService = require('../services/MiningService'); // Import your mining service logic

// Assuming userId is received as a string from the request body
const { userId } = req.body;

/**
 * @route GET /api/mining/balance/:userId
 * @desc Fetch user mining balance
 * @access Public
 */
router.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
    }

    // Fetch balance using the MiningService
    const balance = await MiningService.getBalance(userId);

    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching user balance:', error); // Log error details for debugging
    res.status(500).json({ message: error.message || 'An error occurred while fetching balance.' });
  }
});

/**
 * @route POST /api/mining/start
 * @desc Start the mining process
 * @access Public
 */
router.post('/start', async (req, res) => {
  const { userId, miningDuration = 1 } = req.body;

  try {
    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
    }

    if (miningDuration <= 0 || !Number.isInteger(miningDuration)) {
      return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
    }

    // Start the mining process (handle potential invalid user ID format)
    const minedPoints = await MiningService.startMining(userId, miningDuration);

    res.status(200).json({ minedPoints });
  } catch (error) {
    console.error('Error during mining process:', error);
    if (error.message.includes('Invalid user ID format')) {
      res.status(400).json({ message: 'Invalid user ID format.' });
    } else {
      res.status(500).json({ message: error.message || 'An error occurred during the mining process.' });
    }
  }
});

module.exports = router;