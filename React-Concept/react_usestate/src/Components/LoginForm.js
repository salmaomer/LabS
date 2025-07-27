import { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePasseord = (e) => {
        setPassword(e.target.value);
    }

    const LoggedIn = () => {
        if (email && !email.includes('.com')) {
            alert('the email should contain .com');
        }else if (!email){
            alert('email is required');
        }else if (!email || !password) {
            alert('email and password are required');
        }else {
            alert(`Welcome ${email}`);
        }
    }

    return(
        <div>
            <h2>Logged In</h2>
            <input 
                type = "email"
                name = "email"
                placeholder = "Enter your email"
                value = {email}
                onChange = {handleEmail}
            />
            <input 
                type = "password"
                name = "password"
                placeholder = "Enter your password"
                value = {password}
                onChange = {handlePasseord}
            />
            <button onClick={LoggedIn}>Login</button>

        </div>
    );

}