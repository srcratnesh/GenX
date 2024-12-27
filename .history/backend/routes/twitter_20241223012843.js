const express = require('express');
const { checkIfUserFollows, checkRetweetsAndMentions } = require('../services/twitterService');
const router = express.Router();

// Endpoint to check if a user follows your account
router.get('/check-follow/:username', async (req, res) => {
    const { username } = req.params;
    const yourUserId = 'YOUR_TWITTER_USER_ID'; // Replace with your Twitter user ID
    try {
        const isFollowing = await checkIfUserFollows(username, yourUserId);
        res.json({ isFollowing });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check follow status' });
    }
});

// Endpoint to check retweets and mentions
router.get('/check-actions', async (req, res) => {
    const yourUserId = 'YOUR_TWITTER_USER_ID'; // Replace with your Twitter user ID
    try {
        const actions = await checkRetweetsAndMentions(yourUserId);
        res.json({ actions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actions' });
    }
});

module.exports = router;
