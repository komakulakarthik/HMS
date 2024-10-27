// patient.js (server-side route file for handling patient registration)
const express = require('express');
const bcrypt = require('bcrypt'); // For password hashing
const router = express.Router();
const Patient = require('../models/patient'); // Adjust the path if needed
const User = require('../models/User');

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

        // Create a new user in the User collection with the same credentials
        const newUser = new User({
            email, // Email as the unique identifier
            password: hashedPassword,
            role: 'patient',
        });

        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering patient' });
    }
});

// Get all hospitals
router.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ message: 'Error fetching hospitals' });
    }
});

// Get doctors for a specific hospital
router.get('/hospitals/:hospitalId/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find({ hospital: req.params.hospitalId });
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

// Book an appointment
router.post('/patients/book-appointment', async (req, res) => {
    const { hospital, doctor, reason, date, time } = req.body;
    try {
        const newAppointment = new Appointment({
            hospital,
            doctor,
            reason,
            date,
            time,
            patient: req.user._id, // Assuming you're using JWT or similar for authentication
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Error booking appointment.' });
    }
});

// Fetch appointments for a patient
router.get('/patients/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id }) // Fetch appointments for the logged-in patient
            .populate('hospital') // Adjust based on your schema
            .populate('doctor'); // Adjust based on your schema
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Error fetching appointments.' });
    }
});

module.exports = router;
