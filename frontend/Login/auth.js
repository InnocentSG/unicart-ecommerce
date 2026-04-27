// Tab switching
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
});
loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) return alert('Please enter all fields.');

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message); // invalid credentials

        alert(data.message); // optional
        // Redirect to home page
        window.location.href = '/home.html';
    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});


signupForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm-password').value;

    if (!name || !email || !password || !confirm) return alert('Please enter all fields.');
    if (password !== confirm) return alert('Passwords do not match.');

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: name, email, password })
        });
        const data = await res.json();
        if (!res.ok) return alert(data.message);

        alert('Sign Up successful');
        // Redirect to login page
          window.location.href = '/home.html';

    } catch (err) {
        console.error(err);
        alert('Server error');
    }
});
