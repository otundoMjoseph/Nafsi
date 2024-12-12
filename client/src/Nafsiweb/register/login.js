


    // Fetch data from the API when the page is loaded
    window.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Display fetched data in the HTML
            const dataContainer = document.getElementById('fetchedData');
            dataContainer.innerHTML = `
                <h2>Fetched Data:</h2>
                <ul>
                    ${data.slice(0, 5).map(item => `<li><strong>${item.title}</strong><p>${item.body}</p></li>`).join('')}
                </ul>
            `;
        } catch (error) {
            console.error('There was a problem with fetching data:', error);
        }
    });

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault(); // Prevents the default form submission

        // Get the form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Simple validation checks
        if (name === "" || email === "" || password === "") {
            alert("All fields are required!");
            return false;
        }

        // Check if password has at least 8 characters
        if (password.length < 8) {
            alert("Password must be at least 8 characters long!");
            return false;
        }

        // Check if email format is valid (basic email validation)
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Prepare data for submission
        const formData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch('https://your-api-endpoint.com/login', {  // Replace with your actual API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Login successful!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    }

