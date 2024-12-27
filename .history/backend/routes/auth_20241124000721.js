const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust the path if necessary to your User model
const router = express.Router(); // Create the router object

// Function to generate a unique username
const generateUniqueUsername = async (fullName) => {
    const baseUsername = fullName.split(' ').join('').toLowerCase(); // Remove spaces and convert to lowercase
    let username = baseUsername;
    let counter = 1;

    // Loop to ensure the username is unique by appending a number if necessary
    while (await User.findOne({ username })) {
        username = `${baseUsername}${counter}`;
        counter++;
    }

    return username;
};

// Register route
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // Validate incoming data
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a unique username based on the user's full name
        const username = await generateUniqueUsername(fullName);

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with the provided data
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            username,
            isVerified: false,
        });

        // Save the new user to the database
        await user.save();

        // Uncomment and configure this section if you want to send a verification email
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const verificationLink = `${process.env.BASE_URL}/verify/${user._id}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verify your account',
            html: `<p>Thank you for registering!</p><a href="${verificationLink}">Verify your account</a>`,
        };
        await transporter.sendMail(mailOptions);
        

        // Respond with a success message and the generated username
        res.status(201).json({ message: 'User registered successfully.', username });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and user data
        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});



module.exports = router; // Export the router object
