import { useState } from 'react';

export default function HelloUser() {
    /* The useState Can Have A Strings Value. */
    const [name, setName] = useState(""); 

    return (
        <div>
            <input
            type = "text"
            placeholder = "Enter your name"
            /* The Input Will Be Fully Controlled By React State */
            value ={name}
            /* When You Type, This Runs setName(e.target.value) >> To Update The State */
            onChange = {(e) => setName(e.target.value)}
            />
            {/* Displays The User's Name If It's Typed. */}
            <p>Hello , { name || "guest"}</p>
        </div>
    );
}
  