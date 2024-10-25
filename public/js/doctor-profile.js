document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.getElementById('edit-btn');
    const saveButton = document.getElementById('save-btn');
    const profileForm = document.getElementById('doctor-profile-form');
    const inputs = profileForm.querySelectorAll('input');

    // Toggle edit mode
    editButton.addEventListener('click', function () {
        inputs.forEach(input => input.removeAttribute('readonly'));
        saveButton.style.display = 'inline-block';
        editButton.style.display = 'none';
    });

    // Save changes
    profileForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Here you would typically send data to the backend
        alert('Changes saved successfully!');

        // Set inputs back to readonly and toggle buttons
        inputs.forEach(input => input.setAttribute('readonly', true));
        saveButton.style.display = 'none';
        editButton.style.display = 'inline-block';
    });
});
