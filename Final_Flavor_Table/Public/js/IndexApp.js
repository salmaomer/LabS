const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    
    const formData = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value,
    };
    try {
        const reopns = await fetch('/connect/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (reopns.ok) {
            alert("🎉 Registration successful! Redirecting to login...");
            window.location.href = "Login.html"; 
        } 
        else {
            const error = await response.text();
            alert("👾 Registration failed: " + error);
        }      
    } 
    catch (err) {
        alert("👾 Something went wrong. Please try again.");
        console.error(err);
    }
})