// controllers/doctorController.js
const Doctor = require('../models/Doctor'); // Ensure the path is correct
const Hospital = require('../models/Hospital');
const bcrypt = require('bcrypt');

// Fetch doctors for a specific hospital
exports.getDoctorsByHospital = async (req, res) => {
    try {
        const hospitalId = req.session.hospitalId;
        if (!hospitalId) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const doctors = await Doctor.find({ hospital: hospitalId });
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addDoctor = async (req, res) => {
    try {
        const { hospitalId, name, email, password, specialization } = req.body;

        // Hash the doctor's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new doctor
        const newDoctor = await Doctor.create({
            hospital: hospitalId,
            name,
            email,
            password: hashedPassword,
            specialization
        });

        // Fetch the hospital and update its doctors array
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ error: "Hospital not found" });
        }

        // Add the doctor's ID to the hospital's doctors array
        hospital.doctors.push(newDoctor._id);
        await hospital.save();

        res.status(201).json({ message: "Doctor added successfully", doctor: newDoctor });
    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(500).json({ error: "An error occurred while adding the doctor" });
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        await Doctor.findByIdAndDelete(doctorId);
        res.json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

