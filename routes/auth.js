// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path to your model

// User registration
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/add-hospital', async (req, res) => {
    const { name, admin, password } = req.body;
    try {
        const newHospital = new Hospital({ name, admin, password });
        await newHospital.save();
        res.status(201).json({ message: 'Hospital added successfully' });
    } catch (error) {
        console.error('Error adding hospital:', error);
        res.status(500).json({ message: 'Error adding hospital' });
    }
});


// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password }); // Replace with hashed password check
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
