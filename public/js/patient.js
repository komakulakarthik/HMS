// patient.js (Frontend)

document.addEventListener('DOMContentLoaded', () => {
    fetchHospitals(); // Load hospitals when the page loads
    fetchAppointments(); // Load booked appointments when the page loads
});

// Fetch available hospitals from the backend
async function fetchHospitals() {
    try {
        const response = await fetch('/api/admin/hospitals'); // Replace with your actual API endpoint
        const hospitals = await response.json();

        const hospitalSelect = document.getElementById('hospital');
        hospitals.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital._id; // Use hospital ID for submission
            option.textContent = hospital.name; // Display hospital name
            hospitalSelect.appendChild(option);
        });

        // Add event listener to fetch doctors when a hospital is selected
        hospitalSelect.addEventListener('change', fetchDoctors);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
    }
}

// Fetch doctors based on the selected hospital
async function fetchDoctors() {
    const hospitalId = document.getElementById('hospital').value;
    const doctorSelect = document.getElementById('doctor');
    
    // Clear existing options
    doctorSelect.innerHTML = '<option value="" disabled selected>Select a doctor</option>';

    if (!hospitalId) return;

    try {
        const response = await fetch(`/api/hospital-admin/hospitals/${hospitalId}/doctors`); // Adjust the endpoint as necessary
        const doctors = await response.json();

        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor._id; // Use doctor ID for submission
            option.textContent = `${doctor.name} (${doctor.specialization})`; // Display doctor name and specialization
            doctorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
}

// Handle appointment booking
document.getElementById('appointment-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
        hospital: document.getElementById('hospital').value,
        doctor: document.getElementById('doctor').value,
        reason: document.getElementById('reasonforappointment').value,
        date: document.getElementById('appointment-date').value,
        time: document.getElementById('appointment-time').value,
    };

    try {
        const response = await fetch('/api/patients/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        const confirmationMessage = document.getElementById('confirmation-message');

        if (response.ok) {
            confirmationMessage.textContent = 'Appointment booked successfully!';
            confirmationMessage.style.display = 'block';
            document.getElementById('appointment-form').reset(); // Reset form
            fetchAppointments(); // Refresh booked appointments
        } else {
            confirmationMessage.textContent = data.message;
            confirmationMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
    }
});

// Fetch booked appointments for the patient
async function fetchAppointments() {
    try {
        const response = await fetch('/api/patients/appointments'); // Replace with your actual API endpoint
        const appointments = await response.json();

        const appointmentsTableBody = document.getElementById('appointments-table').getElementsByTagName('tbody')[0];
        appointmentsTableBody.innerHTML = ''; // Clear existing rows

        appointments.forEach(appointment => {
            const row = appointmentsTableBody.insertRow();
            row.insertCell(0).textContent = appointment.date;
            row.insertCell(1).textContent = appointment.time;
            row.insertCell(2).textContent = appointment.hospital;
            row.insertCell(3).textContent = appointment.doctor;
            row.insertCell(4).textContent = appointment.specialty;
        });
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}
