// dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    // Define the API URL (replace with your actual API URL)
    const apiUrl = 'https://api.example.com/data'; 
  
    // Fetch the data from the API
    function fetchData() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Populate Health Providers list
          const healthProvidersList = document.getElementById('health-providers');
          data.providers.forEach(provider => {
            const listItem = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `${provider.name} (${provider.specialization})`; // Assuming 'name' and 'specialization' are fields in the API data
            listItem.appendChild(button);
            healthProvidersList.appendChild(listItem);
          });
  
          // Populate the viewall section
          const viewAllSection = document.querySelector('.viewall');
          viewAllSection.textContent = `Total Providers: ${data.providers.length}`;
  
          // Populate the appointment-list
          const appointmentList = document.getElementById('appointment-list');
          data.appointments.forEach(appointment => {
            const appointmentItem = document.createElement('li');
            const appointmentButton = document.createElement('button');
            appointmentButton.textContent = `Appointment with Dr. ${appointment.doctorName} at ${appointment.time}`; // Assuming 'doctorName' and 'time' are fields in the API data
            appointmentItem.appendChild(appointmentButton);
            appointmentList.appendChild(appointmentItem);
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          alert('Failed to fetch data.');
        });
    }
  
    // Call the fetchData function when the page is loaded
    fetchData();
  });
  