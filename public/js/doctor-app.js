document.addEventListener('DOMContentLoaded', function () {
    const appointmentsList = document.getElementById('appointments-list');

    // Sample data for appointments
    const appointments = [
        { name: 'John Doe', date: '2024-11-01', time: '10:00 AM', reason: 'Routine Check-up' },
        { name: 'Jane Smith', date: '2024-11-01', time: '11:00 AM', reason: 'Follow-up' },
        { name: 'Robert Brown', date: '2024-11-02', time: '2:00 PM', reason: 'Consultation' },
        { name: 'Emily Johnson', date: '2024-11-03', time: '1:00 PM', reason: 'Flu Symptoms' }
    ];

    // Populate the table with appointment data
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = appointment.name;
        row.appendChild(nameCell);
        
        const dateCell = document.createElement('td');
        dateCell.textContent = appointment.date;
        row.appendChild(dateCell);
        
        const timeCell = document.createElement('td');
        timeCell.textContent = appointment.time;
        row.appendChild(timeCell);
        
        const reasonCell = document.createElement('td');
        reasonCell.textContent = appointment.reason;
        row.appendChild(reasonCell);
        
        appointmentsList.appendChild(row);
    });
});
