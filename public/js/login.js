document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const mailid = document.getElementById('mailid').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mailid, password })
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = 'home.html'; 
        } else {
            const result = await response.json();
            alert(result.message || 'Login failed!'); 
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});