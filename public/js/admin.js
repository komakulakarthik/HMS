document.addEventListener('DOMContentLoaded', function () {
    const addHospitalForm = document.getElementById('add-hospital-form');
    const hospitalNameInput = document.getElementById('hospital-name');
    const adminInput = document.getElementById('h_admin');
    const adminPasswordInput = document.getElementById('h_password');

    if (addHospitalForm) {
        addHospitalForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Collect input values
            const hospitalData = {
                name: hospitalNameInput.value,
                admin: adminInput.value,
                password: adminPasswordInput.value
            };

            try {
                const response = await fetch('http://localhost:3000/api/admin/add-hospital', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(hospitalData),
                });

                if (response.ok) {
                    alert('Hospital added successfully!');
                    addHospitalForm.reset(); 
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
