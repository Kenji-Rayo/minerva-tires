document.addEventListener('DOMContentLoaded', function() {
    // Get the role select element
    const roleSelect = document.getElementById('role');
    // Get the admin code container
    const adminCodeContainer = document.querySelector('.admin-code-container');
    
    // Handle account type selection change
    if (roleSelect) {
        roleSelect.addEventListener('change', function() {
            // If admin is selected, show the admin code field
            if (this.value === 'admin') {
                adminCodeContainer.style.display = 'block';
                document.getElementById('adminCode').setAttribute('required', 'required');
            } else {
                adminCodeContainer.style.display = 'none';
                document.getElementById('adminCode').removeAttribute('required');
            }
        });
    }
    
    // Get the registration form
    const registerForm = document.getElementById('registerForm');
    
    // Handle form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('role').value;
            const adminCode = document.getElementById('adminCode')?.value || '';
            const termsAgree = document.getElementById('termsAgree').checked;
            
            // Message container
            const messageContainer = document.getElementById('registerMessage');
            
            // Basic validation
            if (password !== confirmPassword) {
                messageContainer.innerHTML = '<div class="error-message">Passwords do not match!</div>';
                return;
            }
            
            if (password.length < 8) {
                messageContainer.innerHTML = '<div class="error-message">Password must be at least 8 characters long!</div>';
                return;
            }
            
            // Check if password contains at least one number and one special character
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            
            if (!hasNumber || !hasSpecial) {
                messageContainer.innerHTML = '<div class="error-message">Password must contain at least one number and one special character!</div>';
                return;
            }
            
            // If admin role is selected, validate admin code
            if (role === 'admin' && adminCode !== 'ADMIN123') { // Example admin code for demonstration
                messageContainer.innerHTML = '<div class="error-message">Invalid admin registration code!</div>';
                return;
            }
            
            if (!termsAgree) {
                messageContainer.innerHTML = '<div class="error-message">You must agree to the Terms of Service and Privacy Policy!</div>';
                return;
            }
            
            // Create user object to store in localStorage
            const user = {
                firstName,
                lastName,
                email,
                phone,
                password, // In a real application, never store plain text passwords
                role,
                registrationDate: new Date().toISOString()
            };
            
            // Store user in localStorage (in a real app, you would send this to a server)
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                messageContainer.innerHTML = '<div class="error-message">Email already registered!</div>';
                return;
            }
            
            // Add new user
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Display success message
            messageContainer.innerHTML = '<div class="success-message">Registration successful! Redirecting to login...</div>';
            
            // Add new registration to activity log (for admin dashboard)
            const today = new Date();
            const month = today.toLocaleString('default', { month: 'short' });
            const day = today.getDate();
            const year = today.getFullYear();
            const formattedDate = `${month} ${day}, ${year}`;
            
            const newActivity = {
                date: formattedDate,
                user: `${firstName} ${lastName}`,
                activity: 'New account registration',
                status: 'Completed'
            };
            
            let activities = JSON.parse(localStorage.getItem('activities')) || [];
            activities.push(newActivity);
            localStorage.setItem('activities', JSON.stringify(activities));
            
            // Redirect to login page after 2 seconds
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});