'use client'
import { useEffect, useState } from "react";

// Client Component: Interactivity will be added after hydration
interface InteractiveComponentClientProps {
    initialCount: number;
}

const InteractiveComponentClient: React.FC<InteractiveComponentClientProps> = ({ initialCount }) => {
    const [count, setCount] = useState<number>(initialCount);

    useEffect(() => {
        console.log('InteractiveComponent mounted, now it can be interactive.');
    }, []);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
};

export default InteractiveComponentClient;