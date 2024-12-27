const express = require('express');
const router = express.Router();
const MiningService = require('../services/MiningService'); // Placeholder for your mining service logic

// Balance endpoint
router.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    const balance = await MiningService.getBalance(userId); // Fetch user balance
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start mining endpoint
router.post('/start', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    // Start the mining process and update the balance
    const minedPoints = await MiningService.startMining(userId);
    res.json({ minedPoints });
  } catch (error) {
    console.error('Error during mining:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
