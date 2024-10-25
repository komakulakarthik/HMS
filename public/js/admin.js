document.addEventListener('DOMContentLoaded', function () {
    const hospitalsList = document.getElementById('hospitals-list');
    const doctorsList = document.getElementById('doctors-list');
    const hospitalSelect = document.getElementById('hospital-select');

    // Sample data for hospitals and doctors
    const hospitals = [
        { name: 'City Hospital', location: 'Downtown' },
        { name: 'Green Valley Clinic', location: 'Green Valley' }
    ];

    const doctors = [
        { name: 'Dr. Alice Brown', specialization: 'Cardiology', hospital: 'City Hospital' },
        { name: 'Dr. Brian Lee', specialization: 'Dermatology', hospital: 'Green Valley Clinic' }
    ];

    // Populate the hospitals list
    function populateHospitals() {
        hospitalsList.innerHTML = '';
        hospitals.forEach(hospital => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${hospital.name}</td><td>${hospital.location}</td>`;
            hospitalsList.appendChild(row);
        });
    }

    // Populate the doctors list
    function populateDoctors() {
        doctorsList.innerHTML = '';
        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${doctor.name}</td><td>${doctor.specialization}</td><td>${doctor.hospital}</td>`;
            doctorsList.appendChild(row);
        });
    }

    // Populate the hospital select dropdown for adding a new doctor
    function populateHospitalSelect() {
        hospitalSelect.innerHTML = '<option value="">Select Hospital</option>';
        hospitals.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital.name;
            option.textContent = hospital.name;
            hospitalSelect.appendChild(option);
        });
    }

    // Event listener for adding a new hospital
    document.getElementById('add-hospital-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const hospitalName = document.getElementById('hospital-name').value;
        const location = document.getElementById('location').value;

        hospitals.push({ name: hospitalName, location: location });
        populateHospitals();
        populateHospitalSelect();

        alert('Hospital added successfully!');
        e.target.reset();
    });

    // Event listener for adding a new doctor
    document.getElementById('add-doctor-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const doctorName = document.getElementById('doctor-name').value;
        const specialization = document.getElementById('specialization').value;
        const hospitalName = document.getElementById('hospital-select').value;

        doctors.push({ name: doctorName, specialization: specialization, hospital: hospitalName });
        populateDoctors();

        alert('Doctor added successfully!');
        e.target.reset();
    });

    // Initial population of data
    populateHospitals();
    populateDoctors();
    populateHospitalSelect();
});