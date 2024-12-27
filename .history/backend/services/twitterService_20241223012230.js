const Twitter = require('twitter-v2');
require('dotenv').config();

const client = new Twitter({
    bearer_token: process.env.AAAAAAAAAAAAAAAAAAAAANDDxgEAAAAAl8YDav9X0INF%2B5uApJBUPELhpLc%3DCbn5otW1R4Z6er0IBOqv9cCs77ZCMvapwaa3IoL8InzabtidqT, // Add your bearer token in .env
});

// Function to check if a user has followed your account
const checkIfUserFollows = async (username, yourUserId) => {
    try {
        const response = await client.get('users/by/username/' + username);
        const userId = response.data.id;

        const following = await client.get(`users/${userId}/following`);
        const isFollowing = following.data.some((user) => user.id === yourUserId);

        return isFollowing;
    } catch (error) {
        console.error('Error checking follow status:', error);
        return false;
    }
};

// Function to check for retweets or mentions
const checkRetweetsAndMentions = async (yourUserId) => {
    try {
        const response = await client.get(`users/${yourUserId}/tweets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return [];
    }
};

module.exports = { checkIfUserFollows, checkRetweetsAndMentions };
