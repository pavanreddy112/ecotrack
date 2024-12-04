document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const mailid = document.getElementById('mailid').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, mailid, password })
    });

    if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        window.location.href = 'login.html';
    } else {
        alert('Signup failed!');
    }
});