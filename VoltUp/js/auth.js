document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and signup forms
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');

    showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });

    // Populate countries
    const countrySelect = document.getElementById('country');
    const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Nigeria', 'South Africa', 'Ghana', 'Kenya'];
    
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Login form submission
    const loginFormElement = document.getElementById('loginForm');
    loginFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;
            
            // Redirect to dashboard on successful login
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });

    // Signup form submission
    const signupFormElement = document.getElementById('signupForm');
    signupFormElement.addEventListener('submit', async function(e) {
        e.preventDefault();

        
        
        const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) throw error;

        alert('Signup successful! Please check your email for verification.');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Prepare user data
        const userData = {
            email: document.getElementById('signupEmail').value,
            password: password,
            options: {
                data: {
                    first_name: document.getElementById('firstName').value,
                    last_name: document.getElementById('lastName').value,
                    country: document.getElementById('country').value,
                    phone: document.getElementById('phone').value,
                    referral_code: document.getElementById('referralCode').value,
                    dob: document.getElementById('dob').value,
                    // Generate a unique referral code for the new user
                    my_referral_code: generateReferralCode()
                }
            }
        };

        try {
            // Sign up the user
            const { data, error } = await supabase.auth.signUp(userData);
            
            if (error) throw error;
            
            alert('Signup successful! Please check your email for verification.');
            window.location.href = 'dashboard.html';
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    });

    // Function to generate a random referral code
    function generateReferralCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
});