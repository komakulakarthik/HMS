document.addEventListener("DOMContentLoaded", async () => {
    async function fetchHospitalInfo() {
        try {
            const response = await fetch('/api/hospital-admin/hospital-info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Ensure credentials are included
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const hospital = await response.json();
            console.log('Hospital Info:', hospital); // Debugging line
            // Optionally, update the DOM with hospital info here

            // Set the page title to the hospital name
        document.title = hospital.name; // Change the document title to hospital.name
        document.getElementById('hospital-name-header').innerText = `${hospital.name} Admin dashboard`;
        // Set the hidden input value for hospital ID
        document.getElementById('hospital-id').value = hospital._id;
        // Add more fields as needed
        } catch (error) {
            console.error('Error fetching hospital information:', error);
        }
    }
    
    // Call this function after logging in successfully
    fetchHospitalInfo();
    
    // Handle the form submission for adding a doctor
    document.getElementById('add-doctor-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const hospitalId = document.getElementById('hospital-id').value; // Get the hospital ID
    
    console.log('Hospital ID:', hospitalId); // Debugging line
        
        const doctorData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('doctor-password').value,
            specialization: document.getElementById('specialization').value,
            hospitalId: hospitalId
        };

        console.log('Doctor Data:', doctorData); // Debugging line to see the entire object
        
        try {
            const response = await fetch('/api/hospital-admin/add-doctor', { // Ensure the endpoint is correct
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doctorData)
            });
            
            const result = await response.json();
            alert(result.message || "Failed to add doctor."); // Use the message from the server response
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    });
});
