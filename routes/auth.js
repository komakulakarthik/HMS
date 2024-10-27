const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure you have a User model
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword, // Save the hashed password
            role
        });

        // Save user to database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user. Please try again.' });
    }
});

// Route to handle login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body; // username is the email

    try {
        const user = await User.findOne({ email: email }); // Find user by email
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid or password' });
        }

        // Generate a token (optional)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token }); // Send token if needed
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in. Please try again.' });
    }
});

// Route to handle logout (if needed)
router.post('/logout', (req, res) => {
    // Clear the session or token if applicable
    res.status(200).json({ message: 'Logged out successfully.' });
});

module.exports = router;
