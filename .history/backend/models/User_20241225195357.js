const mongoose = require('mongoose');

// Create the user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures username is unique
    },
    isVerified: {
        type: Boolean,
        default: false, // Default value for verification status
    },
    minedPoints: { 
        type: Number, 
        default: 0, // Default value for mined points tracking
    },
    activityLog: { 
        type: Array, 
        default: [], // Default to an empty array for activity logs
    },
    notifications: { 
        type: Array, 
        default: [], // Default to an empty array for notifications
    },
    preferences: { 
        referralBonus: { type: Number, default: 0 }, // Default referral bonus
        referralsMade: { type: Number, default: 0 }, // Default number of referrals made
        todaysEarnings: { type: Number, default: 0 }, // Default earnings for today
    },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
