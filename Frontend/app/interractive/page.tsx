// app/page.tsx (or any component inside the `app` directory)
import InteractiveComponentClient from './interractive';

// Server Component: Fetch data here in the server component
const InteractiveComponent = async () => {
    // Simulate server-side data fetching
    const initialCount = 8; // You can fetch this from a database or an API

    return <InteractiveComponentClient initialCount={initialCount} />;
};



// Main Page Component
const Home = async () => {
    return (
        <div>
            <h1>Server-Side Rendered Page</h1>
            <InteractiveComponent />
        </div>
    );
};

export default Home;