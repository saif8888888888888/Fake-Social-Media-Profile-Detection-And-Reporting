document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on login or signup page
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        // Add password confirmation validation
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        confirmPasswordInput.addEventListener('input', function() {
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        });
    }
    
    // Handle login form submission
    function handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
        submitBtn.disabled = true;
        
        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Simulate API call
        simulateAuthApiCall('login', { email, password, rememberMe })
            .then(user => {
                // Store user data (in a real app, you might store a token)
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                alert('Login failed: ' + error.message);
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }
    
    // Handle signup form submission
    function handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
        submitBtn.disabled = true;
        
        // Get form data
        const fullName = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulate API call
        simulateAuthApiCall('signup', { fullName, email, password })
            .then(user => {
                // Store user data
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            })
            .catch(error => {
                alert('Signup failed: ' + error.message);
            })
            .finally(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }
    
    // Simulate authentication API call
    function simulateAuthApiCall(action, data) {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                // For demo purposes, we'll accept any non-empty credentials
                if ((action === 'login' || action === 'signup') && data.email && data.password) {
                    resolve({
                        id: Math.random().toString(36).substr(2, 9),
                        name: data.fullName || 'User',
                        email: data.email,
                        joined: new Date().toISOString()
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500);
        });
    }
});