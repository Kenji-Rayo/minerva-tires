document.addEventListener('DOMContentLoaded', function() {
    // Get the login form
    const loginForm = document.getElementById('loginForm');
    
    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe')?.checked || false;
            
            // Message container
            const messageContainer = document.getElementById('loginMessage');
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Login successful
                messageContainer.innerHTML = '<div class="success-message">Login successful! Redirecting...</div>';
                
                // Store current user in sessionStorage or localStorage based on rememberMe
                const currentUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                };
                
                if (rememberMe) {
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                } else {
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                }
                
                // Add login activity to activity log
                const today = new Date();
                const month = today.toLocaleString('default', { month: 'short' });
                const day = today.getDate();
                const year = today.getFullYear();
                const formattedDate = `${month} ${day}, ${year}`;
                
                const newActivity = {
                    date: formattedDate,
                    user: `${user.firstName} ${user.lastName}`,
                    activity: 'User login',
                    status: 'Completed'
                };
                
                let activities = JSON.parse(localStorage.getItem('activities')) || [];
                activities.push(newActivity);
                localStorage.setItem('activities', JSON.stringify(activities));
                
                // Redirect based on user role
                setTimeout(function() {
                    if (user.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'index.html'; // or customer dashboard
                    }
                }, 1500);
            } else {
                // Login failed
                messageContainer.innerHTML = '<div class="error-message">Invalid email or password!</div>';
            }
        });
    }
});