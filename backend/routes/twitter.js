// backend/routes/twitter.js
const express = require('express');
const router = express.Router();
const { checkIfUserFollows } = require('../services/twitterService');
const User = require('../models/User'); // Adjust path to your user model

router.get('/follow-status/:username', async (req, res) => {
    const username = req.params.username;
    const projectUserId = 'YOUR_PROJECT_TWITTER_ID'; // Replace with `prj_GenX` Twitter ID

    try {
        const isFollowing = await checkIfUserFollows(username, projectUserId);

        if (isFollowing) {
            // Add points to the user's account (replace `req.user` with your session or auth logic)
            const user = await User.findById(req.user._id); // Assume logged-in user is accessible via req.user
            if (user) {
                user.points += 100; // Add 100 points
                await user.save();
                return res.json({ isFollowing, pointsAdded: 100 });
            }
        }

        res.json({ isFollowing, pointsAdded: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking follow status' });
    }
});

module.exports = router;
