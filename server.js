const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hospital_system', { useNewUrlParser: true, useUnifiedTopology: true });

// Import Routes (you will create these)
const hospitalRoutes = require('./routes/hospital');
const patientRoutes = require('./routes/patient');
const appointmentRoutes = require('./routes/appointment');

// Use Routes
app.use('/hospitals', hospitalRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
