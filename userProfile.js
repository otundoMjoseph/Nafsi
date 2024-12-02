

document.addEventListener("DOMContentLoaded", function() {
    // Getting elements
    const menuImage = document.getElementById("menu"); // Profile image link
    const profileSection = document.getElementById("user-profile"); // Profile section
    const updateButton = document.querySelector("button[type='submit']"); // Update button
    const deleteButton = document.querySelector("button[type='button']"); // Delete button
    const fileInput = document.getElementById("input-file"); // File input for image
    const specializationInput = document.querySelector('input[type="text"]'); // Specialization input
    const experienceSelect = document.getElementById("experience"); // Experience dropdown
    const profilePic = document.getElementById("profile"); // Profile image element
  
    // Fetch profile data from the server
    function fetchProfileData() {
      fetch('https://your-backend.onrender.com/get-profile') // Fetch from the backend
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Update UI with fetched profile data
            profilePic.src = `https://your-backend.onrender.com/uploads/${data.image}`; // Profile image
            specializationInput.value = data.specialization; // Specialization input
            experienceSelect.value = data.experience; // Experience dropdown
          } else {
            console.error("Failed to fetch profile data:", data.message);
          }
        })
        .catch(error => {
          console.error("Error fetching profile data:", error);
        });
    }
  
    // Show profile section when clicking on the menu image
    menuImage.addEventListener("click", function(event) {
      event.preventDefault();
      if (profileSection.style.display === "block") {
        profileSection.style.display = "none"; // Hide profile section if already shown
      } else {
        profileSection.style.display = "block"; // Show profile section
        profileSection.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to profile section
      }
    });
  
    // Hide profile section when clicking outside the profile section
    document.addEventListener("click", function(event) {
      if (!profileSection.contains(event.target) && event.target !== menuImage) {
        profileSection.style.display = "none"; // Hide profile section if clicked outside
      }
    });
  
    // Handle profile update functionality
    updateButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      const file = fileInput.files[0]; // Selected file (profile image)
      const specialization = specializationInput.value; // Specialization
      const experience = experienceSelect.value; // Experience
  
      // Check if file is selected
      if (!file) {
        alert("Please select an image to upload.");
        return; // Exit if no file is selected
      }
  
      // Prepare the data to be sent using FormData
      const formData = new FormData();
      formData.append("image", file); // Add the image file to the FormData
      formData.append("specialization", specialization); // Add specialization to the FormData
      formData.append("experience", experience); // Add experience to the FormData
  
      // Send the form data to the server using fetch
      fetch('https://your-backend.onrender.com/update-profile', {
        method: "POST",
        body: formData, // Send the FormData containing the image and other fields
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Profile updated successfully", data);
          fetchProfileData(); // Refresh profile data after successful update
          profileSection.style.display = "none"; // Optionally, hide the profile section after update
        } else {
          console.error("Error updating profile:", data.message);
        }
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
    });
  
    // Handle profile deletion functionality
    deleteButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      // Confirm deletion
      const confirmDelete = confirm("Are you sure you want to delete your profile?");
      if (confirmDelete) {
        // Example of sending a delete request to your backend
        fetch('https://your-backend.onrender.com/delete-profile', {
          method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log("Profile deleted successfully", data);
            profileSection.style.display = "none"; // Optionally, hide the profile section after deletion
          } else {
            console.error("Error deleting profile:", data.message);
          }
        })
        .catch(error => {
          console.error("Error deleting profile:", error);
        });
      }
    });
  
    // Fetch profile data when the page loads
    fetchProfileData();
  });
  