document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Modal Placeholder ---
    // Function to simulate a confirmation dialog, since window.confirm is forbidden.
    // In a full application, this would be a UI element (div/modal).
    function showLoginStatus(message, isSuccess = false) {
        const title = isSuccess ? "Login Successful!" : "Login Attempt";
        const style = isSuccess ? "background-color: #10B981; color: white; border-left: 5px solid #059669;" : "background-color: #FEE2E2; color: #991B1B; border-left: 5px solid #EF4444;";
        
        // Find the main container to insert the temporary message
        const main = document.querySelector('.login-main');
        let statusBox = document.getElementById('status-message');

        if (!statusBox) {
            statusBox = document.createElement('div');
            statusBox.id = 'status-message';
            statusBox.style.cssText = 'position: fixed; top: 80px; left: 50%; transform: translateX(-50%); padding: 15px 30px; border-radius: 8px; font-family: Inter, sans-serif; z-index: 1000; transition: opacity 0.5s; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 80%; max-width: 400px; text-align: center;';
            main.prepend(statusBox);
        }

        statusBox.style.cssText += style;
        statusBox.innerHTML = `<strong>${title}</strong><p style="margin-top: 5px; font-size: 0.9em;">${message}</p>`;
        statusBox.style.opacity = '1';

        setTimeout(() => {
            statusBox.style.opacity = '0';
        }, 3000);
    }
    
    // --- Login Tab Switching Logic ---
    const loginTabs = document.getElementById('loginTabs');
    const tabButtons = loginTabs.querySelectorAll('.tab-button');
    const loginForms = document.querySelectorAll('.login-form');

    function switchTab(targetId) {
        // Deactivate all buttons and forms
        tabButtons.forEach(btn => btn.classList.remove('active'));
        loginForms.forEach(form => form.classList.remove('active'));

        // Activate the clicked button
        const activeButton = document.querySelector(`.tab-button[data-target="${targetId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Activate the corresponding form
        const activeForm = document.getElementById(targetId);
        if (activeForm) {
            activeForm.classList.add('active');
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // --- Form Submission Handler ---
    loginForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formId = form.id;
            
            // Clear passwords after submission attempt
            const passwordInput = form.querySelector('input[type="password"]');
            if (passwordInput) {
                passwordInput.value = '';
            }

            // Simulate successful login for the Student form only
            if (formId === 'student-form') {
                showLoginStatus("Authentication successful. Redirecting to your dashboard...", true);
                
                // *** REDIRECT TO STUDENT PORTAL ***
                setTimeout(() => {
                    window.location.href = 'portal.html'; 
                }, 1000); // 1-second delay for user to see the success message
            } else if (formId === 'teacher-form') {
                 showLoginStatus("Teacher login is currently unavailable. Please try again later.", false);
            } else if (formId === 'admin-form') {
                 showLoginStatus("Admin access is restricted. Contact IT for credentials.", false);
            }
        });
    });

    // --- Sticky Nav Bar Effect ---
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.style.boxShadow = '0 4px 15px rgba(31, 66, 32, 0.1)';
    }

});