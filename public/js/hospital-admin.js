// /js/admin.js

document.addEventListener('DOMContentLoaded', function () {
    const addDoctorForm = document.getElementById('add-doctor-form');
    const doctorsTableBody = document.getElementById('doctors-list');

    // Fetch doctors list on page load
    async function fetchDoctors() {
        try {
            const response = await fetch('/api/hospital-admin/doctors');
            if (response.ok) {
                const doctors = await response.json();
                doctorsTableBody.innerHTML = ''; // Clear existing rows

                doctors.forEach((doctor) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${doctor.name}</td>
                        <td>${doctor.specialization}</td>
                        <td>${doctor.hospital}</td>
                        <td><button onclick="deleteDoctor('${doctor._id}')">Delete</button></td>
                    `;
                    doctorsTableBody.appendChild(row);
                });
            } else {
                console.error('Failed to fetch doctors');
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    }

    // Add a doctor
    addDoctorForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = {
            hospital: document.getElementById('hospital').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('doctor-password').value,
            specialization: document.getElementById('specialization').value,
        };

        try {
            const response = await fetch('/api/hospital-admin/add-doctor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Doctor added successfully!');
                addDoctorForm.reset(); // Clear the form fields
                fetchDoctors(); // Refresh the doctors list
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Unable to add doctor'}`);
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Delete a doctor
    window.deleteDoctor = async function (doctorId) {
        try {
            const response = await fetch(`/api/admin/doctors/${doctorId}`, { method: 'DELETE' });
            if (response.ok) {
                alert('Doctor deleted successfully!');
                fetchDoctors(); // Refresh the doctors list
            } else {
                alert('Error deleting doctor.');
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    fetchDoctors(); // Initial load of doctors
});
