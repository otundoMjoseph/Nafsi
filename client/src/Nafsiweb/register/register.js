document.addEventListener("DOMContentLoaded", function() {
    // Load country options dynamically from API
    function loadCountries() {
        const countrySelect = document.querySelector("#countrySelect");
  
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                countrySelect.innerHTML = "<option value=''>Select a Country</option>";
  
                const countries = data.map(country => country.name.common);
                countries.sort();
  
                countries.forEach(country => {
                    const option = document.createElement("option");
                    option.value = country;
                    option.textContent = country;
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error fetching country data:", error);
                alert("Failed to load countries. Please try again later.");
            });
    }
  
    // Clear previous error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }
  
    // Show error message next to the relevant field
    function showError(field, message) {
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;
        field.parentElement.appendChild(errorMessage);
    }
  
    // Validate the form before submission
    function validateForm() {
        clearErrors();
  
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const confirmPassword = document.querySelector('#confirmPassword');
        const country = document.querySelector('#countrySelect');
        const gender = document.querySelector('input[name="gender"]:checked');
        const termsAccepted = document.querySelector('#terms');
        const role = document.querySelector('#occupation').value;
        let isValid = true;
  
        // Validation checks
        if (name.value === "") {
            showError(name, "Name is required!");
            isValid = false;
        }
  
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,4}$/;
        if (!emailRegex.test(email.value)) {
            showError(email, "Please enter a valid email!");
            isValid = false;
        }
  
        if (password.value.length < 8) {
            showError(password, "Password must be at least 8 characters!");
            isValid = false;
        }
  
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match!");
            isValid = false;
        }
  
        if (!gender) {
            const genderRadio = document.querySelector('input[name="gender"]');
            showError(genderRadio, "Please select a gender!");
            isValid = false;
        }
  
        if (country.value === "") {
            showError(country, "Please select a country!");
            isValid = false;
        }
  
        if (!termsAccepted.checked) {
            const termsLabel = document.querySelector('label[for="terms"]');
            showError(termsLabel, "You must accept the terms and conditions!");
            isValid = false;
        }
  
        // Role-based redirection after successful validation
        if (role && isValid) {
            redirectToDashboard(role); // Redirect based on the selected role
        }
  
        return isValid;
    }
  
    // Fetch role data from API
    async function fetchRoleData() {
        try {
            const response = await fetch('https://your-render-api-url.com/roles');
            if (!response.ok) {
                throw new Error("Failed to fetch role data");
            }
            const data = await response.json();
            return data; // Assuming the API returns role data
        } catch (error) {
            console.error("Error fetching role data:", error);
            alert("Failed to load role data. Please try again later.");
            return [];
        }
    }
  
    // Redirect user based on role
    function redirectToDashboard(role) {
        fetchRoleData().then(roles => {
            const roleData = roles.find(r => r.role === role);
  
            if (!roleData) {
                alert("Invalid role selected.");
                return;
            }
  
            let dashboardUrl = "";
            switch(roleData.role) {
                case "Doctor":
                    dashboardUrl = "doctor_dashboard.html"; 
                    break;
                case "Admin":
                    dashboardUrl = "admin_dashboard.html"; 
                    break;
                case "Patient":
                    dashboardUrl = "patient_dashboard.html"; 
                    break;
                default:
                    alert("Unknown role");
                    return;
            }
  
            window.location.href = dashboardUrl;
        });
    }
  
    // Add event listener for form submission
    document.querySelector("#signupForm").addEventListener("submit", function(event) {
        event.preventDefault();
  
        if (validateForm()) {
            alert("Form submitted successfully!");
        }
    });
  
    // Load country options on page load
    loadCountries();
  });
  