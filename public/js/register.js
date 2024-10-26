document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const fullnameInput = document.getElementById('fullname');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const addressInput = document.getElementById('address');

    registerForm.addEventListener('submit', async function (event) {
        let isValid = true; // Flag to check overall form validity

        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false; // Set flag to false
            alert('Passwords do not match. Please try again.');
        }

        // Check if phone number is exactly 10 digits
        const phoneNumber = phoneInput.value.trim();
        if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false; // Set flag to false
            alert('Phone number must be exactly 10 digits.');
        }

        // Check if email is valid using regex
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        if (!emailPattern.test(email)) {
            isValid = false; // Set flag to false
            alert('Please enter a valid email address.');
        }

        // Prevent form submission if any validation fails
        if (!isValid) {
            event.preventDefault();
            return; // Stop further execution
        }

        // Gather data to send
        const formData = {
            name: fullnameInput.value,
            email: emailInput.value,
            password: passwordInput.value, // Make sure to hash this on the server
            age: ageInput.value,
            gender: genderInput.value,
            phone: phoneInput.value,
            address: addressInput.value // Add the address field
        };

        try {
            const response = await fetch('/api/patients/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            // Redirect to the login page after successful registration
            window.location.href = 'login.html';

        } catch (error) {
            alert(error.message); // Show error message
        }
    });
});
