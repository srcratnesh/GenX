// backend/routes/twitter.js
const express = require('express');
const router = express.Router();
const { checkIfUserFollows } = require('../services/twitterService');

router.get('/is-following/:username', async (req, res) => {
    const username = req.params.username;
    const projectUserId = 'YOUR_PROJECT_TWITTER_ID'; // Replace with `prj_GenX` Twitter ID

    try {
        const isFollowing = await checkIfUserFollows(username, projectUserId);
        res.json({ isFollowing });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking follow status' });
    }
});

module.exports = router;
