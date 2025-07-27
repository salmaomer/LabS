/* This To Know The Difference Between Using The Previous / The Current State Value */
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
     
    const handleBrokenIncrement = () => {
        /* All Three Lines Use The Same Value Of count, Which Is 0, so: 
        count + 1 = 1
        count + 1 = 1
        count + 1 = 1
        So The Final Value Will Be 1, Not 3.
        */
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    };

    const handleSafeIncrement = () => {
        /* Using The Previous State Value To Ensure Each Increment Uses The Updated Value:
        prev + 1 = 1
        prev + 1 = 2
        prev + 1 = 3    
        So The Final Value Will Be 3.
        */
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    };

    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={handleSafeIncrement}>Safe Increment</button>
            <button onClick={handleBrokenIncrement}>Broken Increment</button>
        </>
    );
}

export default Counter;
