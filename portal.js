document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dynamic Time Display ---
    const portalTimeElement = document.getElementById('portalTime');
    
    function updateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        const formattedTime = now.toLocaleDateString('en-US', options);
        if (portalTimeElement) {
            portalTimeElement.textContent = formattedTime.replace(',', ' |');
        }
    }

    // Update immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000); 

    // --- Sidebar Link Active State Handler ---
    const portalLinks = document.querySelectorAll('.portal-link');

    portalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove 'active' class from all links
            portalLinks.forEach(l => l.classList.remove('active'));
            // Add 'active' class to the clicked link
            e.currentTarget.classList.add('active');
            
            // In a full application, this would load content dynamically 
            // but for this example, we just scroll to the section
            e.preventDefault(); 
            const targetId = e.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll behavior (adjusting for fixed nav height)
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Attempted to navigate to non-existent section: ${targetId}`);
            }
        });
    });

    // --- Logout Button Handler ---
    const logoutButton = document.getElementById('logoutButton');
    
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Replace the alert with a custom modal UI in a real app (per instructions)
            const confirmed = window.confirm("Are you sure you want to log out?");
            
            if (confirmed) {
                console.log("User logged out.");
                // In a real application, this would clear the session and redirect to the login page
                window.location.href = 'login.html'; 
            }
        });
    }

});