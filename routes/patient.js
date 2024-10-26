// patient.js (server-side route file for handling patient registration)
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const router = express.Router();
const Patient = require('../models/patient'); // Adjust the path if needed

// Patient registration route
router.post('/register', async (req, res) => {
    const { name, email, password, age, gender, phone, address } = req.body;

    try {
        // Check if a patient with this email already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Email already registered. Please use a different email.' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient
        const newPatient = new Patient({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            phone,
            address,
        });

        // Save the new patient to the database
        await newPatient.save();

        // Send success response
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering patient' });
    }
});

// In patient.js or relevant route file
router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await Patient.findOne({ email: username }); // Adjust based on your schema
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Send JSON success response
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
