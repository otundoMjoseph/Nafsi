document.addEventListener('DOMContentLoaded', function() {

    // API Endpoint (REPLACE WITH YOUR ACTUAL API ENDPOINT)
    const apiEndpoint = '/your-api-endpoint'; //Example


    // Fetch data and update buttons
    fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            updateButtons(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle error appropriately (e.g., display an error message to the user)
            alert("Error fetching data from the API. Please check your network connection and try again.");
        });


    function updateButtons(data) {
      //Example: Assuming your API returns an object with button text. Adapt to your data structure.
        const viewDoctorsButton = document.querySelector('#patients-buttons li:first-child button');
        const selectDoctorButton = document.querySelector('#patients-buttons li:last-child button');

        if (data.viewDoctorsText) viewDoctorsButton.textContent = data.viewDoctorsText;
        if (data.selectDoctorText) selectDoctorButton.textContent = data.selectDoctorText;

         // Add more updates for other buttons as needed based on your API response.


    }



    // Review Modal functionality
    const reviewModal = document.getElementById('reviewModal');
    const reviewModalClose = document.querySelector('.modal .close');
    const reviewButton = document.querySelector('.viewall button');  
    const reviewForm = document.getElementById('reviewForm');
    const submitReviewButton = document.getElementById('submitReviewButton');
    const hideReviewButton = document.getElementById('hideReviewButton');
    

    reviewButton.addEventListener('click', () => {
        reviewModal.style.display = 'block';
    });

    reviewModalClose.addEventListener('click', () => {
        reviewModal.style.display = 'none';
    });
    
    hideReviewButton.addEventListener('click', () => {
        reviewModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == reviewModal) {
            reviewModal.style.display = 'none';
        }
    });


    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const reviewText = document.getElementById('reviewText').value;
        if (reviewText.trim() === "") {
            alert("Please enter a review.");
            return;
        }
        //Send the review to your backend API here using fetch or axios

        alert(`Review submitted: "${reviewText}"`); // Placeholder - Replace with AJAX call to server
        reviewModal.style.display = 'none';
        document.getElementById('reviewText').value = ''; //Clear the text area

    });


});