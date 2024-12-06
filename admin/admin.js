// Base API URL (replace this with your actual Render API URL)
const baseURL = 'https://your-api-url.onrender.com/api'; // Replace with actual URL

// Helper function to fetch data from the API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${baseURL}/${endpoint}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Get all the buttons
const healthProviderButtons = document.querySelectorAll('#health-providers button');
const appointmentButtons = document.querySelectorAll('.medical-check button');
const ratingButtons = document.querySelectorAll('.viewall button');
const doctorButtons = document.querySelectorAll('.select-doctor button');
const scheduleButtons = document.querySelectorAll('.book-appointment button');
const appointmentActions = document.querySelectorAll('#appointment-list button');

// Handle Health Provider button clicks
healthProviderButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'Check Staff') {
            alert("Fetching health staff...");
            // Fetch health providers or staff data
            const staffData = await fetchData('staff'); // Replace with your actual API endpoint
            console.log(staffData); // Replace with code to display data
        }
    });
});

// Handle Appointment buttons clicks
appointmentButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'View appointments') {
            alert("Fetching your appointments...");
            // Fetch appointments from the API
            const appointments = await fetchData('appointments'); // Replace with actual endpoint
            console.log(appointments); // Replace with code to display appointments
        }
    });
});

// Handle Ratings button clicks
ratingButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'ratings') {
            alert("Fetching ratings...");
            // Fetch ratings data
            const ratings = await fetchData('ratings'); // Replace with actual endpoint
            console.log(ratings); // Replace with code to display ratings
        }
    });
});

// Handle Doctor View button clicks
doctorButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'view doctors') {
            alert("Fetching doctors...");
            // Fetch list of doctors
            const doctors = await fetchData('doctors'); // Replace with actual endpoint
            console.log(doctors); // Replace with code to display doctors
        }
    });
});

// Handle Booking Schedule button clicks
scheduleButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'View doctors schedule') {
            alert("Fetching doctors' schedules...");
            // Fetch doctors' schedules from the API
            const schedules = await fetchData('schedules'); // Replace with actual endpoint
            console.log(schedules); // Replace with code to display schedules
        } else if (buttonText === 'Update') {
            alert("Updating schedule...");
            // Handle schedule update (you can add the logic for updating the schedule here)
        }
    });
});

// Handle Appointment actions (History & Deletion)
appointmentActions.forEach(button => {
    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        
        if (buttonText === 'Appointment history') {
            alert("Fetching your appointment history...");
            // Fetch appointment history
            const history = await fetchData('appointment-history'); // Replace with actual endpoint
            console.log(history); // Replace with code to display history
        } else if (buttonText === 'Delete appointment') {
            alert("Deleting the selected appointment...");
            // Fetch the ID of the appointment to delete
            const appointmentId = '123'; // Example: You should get this ID dynamically from the UI
            await fetch(`${baseURL}/appointments/${appointmentId}`, {
                method: 'DELETE',
            });
            alert('Appointment deleted successfully');
        }
    });
});
