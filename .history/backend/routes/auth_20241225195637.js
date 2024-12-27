const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('..'); /
const router = express.Router();

const generateUniqueUsername = async (fullName) => {
  const baseUsername = fullName.split(' ').join('').toLowerCase();
  let username = baseUsername;
  let counter = 1;

  while (await User.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  return username;
};

router.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const username = await generateUniqueUsername(fullName);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      username,
      isVerified: false,
    });

    await user.save();

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
