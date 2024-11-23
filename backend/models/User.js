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
        default: 0 
    }, // Optional: for mined points tracking
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
