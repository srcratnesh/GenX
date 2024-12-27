router.post('/start', async (req, res) => {
  const { userId, miningDuration = 1 } = req.body;

  console.log('Received userId:', userId); // Log userId for debugging

  try {
    if (!userId || userId.trim() === '') {
      return res.status(400).json({ message: 'User ID is required and cannot be empty.' });
    }

    if (miningDuration <= 0 || !Number.isInteger(miningDuration)) {
      return res.status(400).json({ message: 'Mining duration must be a positive integer.' });
    }

    // Start the mining process
    const minedPoints = await MiningService.startMining(userId, miningDuration);

    res.status(200).json({ minedPoints });
  } catch (error) {
    console.error('Error during mining process:', error);
    res.status(error.message.includes('Invalid user ID format') || error.message.includes('User not found') ? 400 : 500)
      .json({ message: error.message || 'An error occurred during the mining process.' });
  }
});
