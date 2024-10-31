// controllers/patientController.js
const Patient = require('../models/Patient'); // Ensure the path is correct
const Appointment = require('../models/Appointment'); // Ensure the path is correct

// Register a new patient
exports.registerPatient = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        
        const newPatient = new Patient({ name, email, phone });
        await newPatient.save();

        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
        console.error('Error registering patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Book an appointment for a patient
exports.bookAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date,
            time,
        });
        await newAppointment.save();

        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
