// admin.js (Frontend)
document.addEventListener('DOMContentLoaded', function () {
    const addHospitalForm = document.getElementById('add-hospital-form');
    const hospitalNameInput = document.getElementById('hospital-name');
    const adminInput = document.getElementById('h_admin');
    const adminPasswordInput = document.getElementById('h_password');
    const emailInput = document.getElementById('h_email');

    if (addHospitalForm) {
        addHospitalForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Collect input values
            const hospitalData = {
                name: hospitalNameInput.value,
                admin: adminInput.value,
                password: adminPasswordInput.value,
                email: emailInput.value
                // Optional fields can be added later
            };

            try {
                const response = await fetch('/api/admin/add-hospital', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(hospitalData), // Use the collected hospitalData directly
                });

                if (response.ok) {
                    alert('Hospital added successfully!');
                    addHospitalForm.reset(); // Clear the form after successful submission
                } else {
                    const errorData = await response.json();
                    alert(`Error adding hospital: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error adding hospital:', error);
                alert('An error occurred while adding the hospital. Please try again.');
            }
        });
    } else {
        console.error('Add hospital form not found.');
    }
});
