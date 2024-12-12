
        // JavaScript to handle fetch and form submission
        const form = document.getElementById('feedback-form');
        const textarea = document.getElementById('feedback-textarea');
        const responseMessage = document.getElementById('response-message');

        // Fetch data from API on page load
        window.addEventListener('load', () => {
            fetchData();
        });

        // Fetch data (on render)
        function fetchData() {
            responseMessage.textContent = 'Loading feedback instructions...';
            responseMessage.className = 'message loading';

            // Replace with your actual API endpoint
            fetch('https://jsonplaceholder.typicode.com/posts/1') // Example API call
                .then(response => response.json())
                .then(data => {
                    // Display instructions or other data from the API (for example)
                    responseMessage.textContent = `Instructions: ${data.title}. Please send your feedback.`;
                    responseMessage.className = 'message success';
                })
                .catch(error => {
                    responseMessage.textContent = 'Error fetching data. Please try again later.';
                    responseMessage.className = 'message error';
                    console.error('Error fetching data:', error);
                });
        }

        // Handle form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent form submission (page reload)

            const feedback = textarea.value.trim();

            if (feedback === '') {
                alert('Please write some feedback before sending.');
                return;
            }

            // Display loading message while waiting for API response
            responseMessage.textContent = "Sending feedback...";
            responseMessage.className = "message loading";

            // Prepare the feedback data to send
            const data = {
                feedback: feedback
            };

            // Send feedback to API (replace with your actual API endpoint)
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                responseMessage.textContent = 'Thank you for your feedback!😊';
                responseMessage.className = 'message success';

                // Clear the textarea after submission
                textarea.value = '';
            })
            .catch(error => {
                responseMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                responseMessage.className = 'message error';
                console.error('Error sending feedback:', error);
            });
        });