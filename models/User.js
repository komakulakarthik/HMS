const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin', 'hospital-admin'],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
