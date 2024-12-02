document.addEventListener('DOMContentLoaded', function() {
    // Find the toggle button (the anchor tag that will toggle dark mode)
    const toggleButton = document.querySelector('#toggle-theme'); 

    // Check the current theme from localStorage or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // Change the moon icon to the sun icon if dark mode is active
        toggleButton.querySelector('i').classList.remove('bxs-moon');
        toggleButton.querySelector('i').classList.add('bxs-sun');
    }

    // Toggle the theme when the button is clicked
    toggleButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent any default behavior like following a link

        // Toggle the dark mode class on the body
        document.body.classList.toggle('dark-mode');

        // Change the icon based on the theme
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.querySelector('i').classList.remove('bxs-moon');
            toggleButton.querySelector('i').classList.add('bxs-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.querySelector('i').classList.remove('bxs-sun');
            toggleButton.querySelector('i').classList.add('bxs-moon');
            localStorage.setItem('theme', 'light');
        }
    });
});
