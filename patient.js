document.addEventListener('DOMContentLoaded', function () {
    const hospitalSelect = document.getElementById('hospital');
    const doctorSelect = document.getElementById('doctor');
    const appointmentForm = document.getElementById('appointment-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Mock data for doctors based on selected hospital
    const hospitalDoctors = {
        hospital1: [
            { name: 'Dr. Smith', specialty: 'Cardiology' },
            { name: 'Dr. Jones', specialty: 'Neurology' }
        ],
        hospital2: [
            { name: 'Dr. Brown', specialty: 'Pediatrics' },
            { name: 'Dr. White', specialty: 'General Practice' }
        ],
        hospital3: [
            { name: 'Dr. Green', specialty: 'Dermatology' },
            { name: 'Dr. Black', specialty: 'Orthopedics' }
        ]
    };

    // Populate doctor dropdown based on selected hospital
    hospitalSelect.addEventListener('change', function () {
        const selectedHospital = this.value;
        const doctors = hospitalDoctors[selectedHospital] || [];

        // Clear previous options
        doctorSelect.innerHTML = '<option value="" disabled selected>Select a doctor</option>';

        // Populate new options
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = `${doctor.name} (${doctor.specialty})`;
            doctorSelect.appendChild(option);
        });
    });

    // Handle form submission to book appointment
    appointmentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const selectedHospital = hospitalSelect.options[hospitalSelect.selectedIndex].text;
        const selectedDoctor = doctorSelect.value;
        const appointmentDate = document.getElementById('appointment-date').value;

        // Show confirmation message
        confirmationMessage.style.display = 'block';
        confirmationMessage.textContent = `Appointment booked with ${selectedDoctor} at ${selectedHospital} on ${appointmentDate}.`;
    });
});

//this is for patient-profile
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
    const successMessage = document.getElementById('success-message');

    profileForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Logic to save the form data can go here (e.g., AJAX call)

        // Display success message
        successMessage.style.display = 'block';

        // Optionally, reset the form
        profileForm.reset();
    });
});
