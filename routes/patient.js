// routes/patient.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');  // Adjust path to your model
const Appointment = require('../models/Appointment');  // Adjust path to your model

// Register a patient
router.post('/register', async (req, res) => {
    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new patient object
        const patient = new Patient({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address, // Make sure this field is included
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        console.error('Error during registration:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error registering patient', error });
    }
});

// Book an appointment
router.post('/book-appointment', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error });
    }
});

// Fetch patient details
router.get('/:patientId', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patient details', error });
    }
});

module.exports = router;
