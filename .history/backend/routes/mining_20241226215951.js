const express = require('express');
const router = express.Router();
const MiningService = require('../services/MiningService'); // Placeholder for your mining service logic

// Balance endpoint
router.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
  }

  try {
    // Fetch user balance from your mining service
    const balance = await MiningService.getBalance(userId);
    
    if (balance === null || balance === undefined) {
      return res.status(404).json({ message: 'User not found or balance unavailable.' });
    }
    
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error); // Log the error for debugging
    // Check the specific error and respond accordingly
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start mining endpoint
router.post('/start', async (req, res) => {
  const { userId, miningDuration = 1 } = req.body; // Default miningDuration is 1

  // Validate userId
  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
  }

  // Validate miningDuration: Must be a positive integer
  if (miningDuration <= 0 || !Number.isInteger(miningDuration)) {
    return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
  }

  try {
    // Start the mining process with the provided userId and miningDuration
    const minedPoints = await MiningService.startMining(userId, miningDuration);
    
    if (minedPoints === null || minedPoints === undefined) {
      return res.status(404).json({ message: 'Mining failed or user not found.' });
    }
    
    // Respond with the mined points
    res.json({ minedPoints });
  } catch (error) {
    console.error('Error during mining process:', error); // Log the error for debugging
    // Check if the error has a message and handle accordingly
    if (error.message) {
      return res.status(500).json({ message: error.message });
    }
    // Fallback error message
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
