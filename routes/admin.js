// admin.js (Backend)
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const Hospital = require('../models/Hospital'); // Ensure you have a Hospital model
const Doctor = require('../models/Doctor'); // Ensure you have a Doctor model

// Route to get the list of all hospitals
router.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ message: 'Error fetching hospitals' });
    }
});

// Route to add a new hospital
router.post('/add-hospital', async (req, res) => {
    const { name, admin, email, password } = req.body; // Ensure these match your form inputs

    // Check if the required fields are provided
    if (!name || !admin || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Debugging: Log the password being hashed
        console.log('Adding hospital with password:', password); // Debugging line

        // Hash the admin password
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt rounds of 10
        
        // Create a new hospital instance
        const newHospital = new Hospital({
            name: name,
            admin: admin,
            email: email,
            password: hashedPassword, // Ensure hashed password is stored
        });

        await newHospital.save();

        // Create a new user in the User collection with the same credentials
        const newUser = new User({
            email, // Email as the unique identifier
            password: hashedPassword,
            role: 'hospital-admin',
        });

        await newUser.save();

        // Log the new hospital object
        console.log('New Hospital Created:', newHospital);
        res.status(201).json({ message: 'Hospital added successfully!' });
    } catch (error) {
        console.error('Error adding hospital:', error);
        res.status(500).json({ message: 'Error adding hospital. Please try again.' });
    }
});

// Route to delete a hospital by ID
router.delete('/hospitals/:id', async (req, res) => {
    try {
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        console.error('Error deleting hospital:', error);
        res.status(500).json({ message: 'Error deleting hospital' });
    }
});

// Route to get the list of all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('hospital', 'name');
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors' });
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
