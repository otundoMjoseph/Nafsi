document.addEventListener("DOMContentLoaded", function() {

  
    function validateForm() {
      const name = document.querySelector('input[type="text"]:nth-of-type(1)').value;
      const email = document.querySelector('input[type="text"]:nth-of-type(2)').value;
      const password = document.querySelector('input[type="password"]:nth-of-type(1)').value;
      const confirmPassword = document.querySelector('input[type="password"]:nth-of-type(2)').value;
      const country = document.querySelector('#country select').value;
      const gender = document.querySelector('input[name="gender"]:checked');
      const termsAccepted = document.querySelector('#check').checked;
  
      
      if (name === "") {
        alert("Name is required!");
        return false;
      }
  
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,4}$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email!");
        return false;
      }
  
     
      if (password.length < 8) {
        alert("Password must be at least 8 characters!");
        return false;
      }
  
     
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
      }
  
     
      if (!gender) {
        alert("Please select a gender!");
        return false;
      }
  
   
      if (country === "") {
        alert("Please select a country!");
        return false;
      }
  
   
      if (!termsAccepted) {
        alert("You must accept the terms and conditions!");
        return false;
      }
  
   
      return true;
    }
  
   
    function loadCountries() {
      const countrySelect = document.querySelector("#country select");
      
    
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
  
   
    document.querySelector("form").addEventListener("submit", function(event) {
      event.preventDefault(); 
  
      if (validateForm()) {
        alert("Form submitted successfully!");
       
      }
    });
  
    
    loadCountries();
  });
  