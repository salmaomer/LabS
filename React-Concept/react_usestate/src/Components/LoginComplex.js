import { useState } from 'react';

export default function LoginComplex() {
    const [formData, setFormData] = useState({email: "", password: ""});

    const handleForm = (e) => {
        const { name, value } = e.target;

        setFormData((prve) => ({...prve, [name]: value }));
    }


    const LoggedIn = () => {
        if (formData.email && !formData.email.includes('.com')) {
            alert('the email should contain .com');
        }else if (!formData.email){
            alert('email is required');
        }else if (!formData.email || !formData.password) {
            alert('email and password are required');
        }else {
            alert(`Welcome ${formData.email}`);
        }
    }

    return(
        <div>
            <h2>Logged In</h2>
            <input 
                type = "email"
                name = "email"
                placeholder = "Enter your email"
                value = {formData.email}
                onChange = {handleForm}
            />
            <input 
                type = "password"
                name = "password"
                placeholder = "Enter your password"
                value = {formData.password}
                onChange = {handleForm}
            />
            <button onClick={LoggedIn}>Login</button>

        </div>
    );
}

/* This To Understand The ...prev Concept */
const object ={
    name: "salma",
    age: 24,
    location:{
        city: "Amman",
        country: "Jordan",
        address: {
            street: "Queen Rania",
            building: "1"
        }        
    },
    stady : "React"  
}
/* null >> This Is For The "Replacer" : It Lets You Filter Or Change Values While Stringifying. */
/* 2 >> This Is The "Space" Parameter, Which Controls Indentation For Formatting. */
/* All This To Make The Output Order Same The How I Write Code. */
console.log(JSON.stringify(object, null, 2));

console.log({...object,
    age: 25,
    location:{...object.location, 
        city: "Irbid"
    }
});