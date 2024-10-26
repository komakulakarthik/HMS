// login.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleInput = document.getElementById('role');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Gather data to send
        const formData = {
            username: usernameInput.value,
            password: passwordInput.value,
            role: roleInput.value,
        };

        try {
            const response = await fetch('http://localhost:3000/api/patients/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            // Redirect to the patient dashboard after successful login
            window.location.href = 'patient.html';

        } catch (error) {
            alert(error.message || 'An error occurred while logging in.');
        }
    });
});
