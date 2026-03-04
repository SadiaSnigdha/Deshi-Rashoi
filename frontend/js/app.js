// Main App - initialize and start the application
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize store
    await Store.init();
    
    // Initialize router
    Router.init();
    
    // Set up login form
    const loginForm = document.getElementById('login-form');
    const loginTitle = document.getElementById('login-title');
    const nameInput = document.getElementById('name-input');
    const toggleText = document.getElementById('toggle-text');
    let currentState = 'Login';
    
    document.getElementById('login-toggle').addEventListener('click', () => {
        currentState = currentState === 'Login' ? 'Sign Up' : 'Login';
        loginTitle.textContent = currentState;
        nameInput.style.display = currentState === 'Sign Up' ? 'block' : 'none';
        toggleText.innerHTML = currentState === 'Login' 
            ? 'Create a new account? <span style="color:tomato;font-weight:bold;">Sign Up</span>'
            : 'Already have an account? <span style="color:tomato;font-weight:bold;">Login</span>';
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        const name = document.getElementById('name-input').value;
        
        let result;
        if (currentState === 'Login') {
            result = await Store.login(email, password);
        } else {
            result = await Store.register(name, email, password);
        }
        
        if (result.success) {
            showToast(`${currentState} Successfully`, 'success');
            document.getElementById('login-popup').style.display = 'none';
        } else {
            showToast(result.message || 'Error', 'error');
        }
    });
});
