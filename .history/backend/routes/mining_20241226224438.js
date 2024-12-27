const express = require('express');
const router = express.Router();
const MiningService = require('../services/MiningService');

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
  const { userId, miningDuration } = req.body;

  try {
    console.log('POST /start - Body:', req.body); // Log incoming request body

    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
    }

    if (!Number.isInteger(miningDuration) || miningDuration <= 0) {
      return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
    }

    const minedPoints = await MiningService.startMining(userId, miningDuration);
    return res.status(200).json({ minedPoints });
  } catch (error) {
    console.error('Error in POST /start:', error.message || error);
    res.status(500).json({ message: error.message || 'An error occurred during the mining process.' });
  }
});