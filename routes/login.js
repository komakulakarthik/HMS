// login.js (server-side route file for handling patient login)
const express = require('express');
const router = express.Router();
const Patient = require('../models/patient'); // Adjust the path if needed
const bcrypt = require('bcrypt');

// Patient login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the patient by email
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
