// routes/admin.js

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Hospital = require('../models/Hospital')
const User = require('../models/User');
const Doctor = require('../models/Doctor'); // Ensure you have a Doctor model

// Route to get the list of all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

// Route to add a new doctor
router.post('/add-doctor', async (req, res) => {
    const {hospital, name, email, password, specialization } = req.body;

    if (!hospital || !name || !email || !password || !specialization) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            hospital,
            name,
            email,
            password: hashedPassword,
            specialization,
            role: 'doctor',
        });

        await newDoctor.save();

        // Create a new user in the User collection with the same credentials
        const newUser = new User({
            email, // Email as the unique identifier
            password: hashedPassword,
            role: 'doctor',
        });

        await newUser.save();

        res.status(201).json({ message: 'Doctor added successfully!' });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ message: 'Error adding doctor' });
    }
});

// Route to delete a doctor by ID
router.delete('/doctors/:id', async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ message: 'Error deleting doctor' });
    }
});

module.exports = router;
