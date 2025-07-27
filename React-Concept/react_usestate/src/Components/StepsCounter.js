import { useState } from 'react';

export default function StepsCounter() {
    const [steps, setSteps] = useState(0);

    const handleWalk = () => {
        setSteps(steps + 100);
    }

    return(
        <div>
            <h2> Steps : {steps}</h2>
            {/* This Condition Checks: If Steps Is 1000 Or More, Then:
            The Button Becomes Disabled (Unclickable). */}
            <button onClick={handleWalk} disabled = {steps >=1000}>Walk</button>
            <button onClick={()=> setSteps(0)}>Reste</button>
        </div>
    );
}