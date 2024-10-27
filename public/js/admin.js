// admin.js (Frontend)

document.getElementById('add-hospital-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
        name: document.getElementById('hospital-name').value,
        admin: document.getElementById('h_admin').value,
        email: document.getElementById('h_email').value,
        password: document.getElementById('h_password').value, // Change h_password to password for consistency
    };

    console.log('Form Data:', formData); // Debugging: Log form data

    try {
        const response = await fetch('/api/admin/add-hospital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show success message
            // Optionally, reset the form or redirect
            document.getElementById('add-hospital-form').reset(); // Reset form after successful submission
        } else {
            const errorData = await response.json();
            alert(errorData.message); // Show error message
        }
    } catch (error) {
        console.error('Error adding hospital :', error);
        alert('Error adding hospital. Please try again1.');
    }
});