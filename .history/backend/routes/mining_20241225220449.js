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
    const balance = await MiningService.getBalance(userId); // Fetch user balance from your mining service
    if (balance === null) {
      return res.status(404).json({ message: 'User not found or balance unavailable.' });
    }
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start mining endpoint
router.post('/start', async (req, res) => {
  const { userId, miningDuration = 1 } = req.body; // You can add duration or other parameters as needed

  // Validate userId
  if (!userId || userId.trim() === '') {
    return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
  }

  // Optional: Validate miningDuration, ensure it's a positive integer
  if (miningDuration <= 0 || !Number.isInteger(miningDuration)) {
    return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
  }

  try {
    // Start the mining process and update the balance (integrating mining duration or any logic)
    const minedPoints = await MiningService.startMining(userId, miningDuration); 
    if (!minedPoints) {
      return res.status(404).json({ message: 'Mining failed or user not found.' });
    }
    res.json({ minedPoints });
  } catch (error) {
    console.error('Error during mining:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
