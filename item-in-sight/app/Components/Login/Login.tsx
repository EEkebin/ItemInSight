// Directive to optimize this component for client-side rendering in Next.js
'use client'

// Import necessary hooks and utilities from React and Next.js libraries
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

// Import the authentication function from a custom library
import { authenticate } from '../../lib/action';

// Define the structure of the authentication response
interface AuthResponse {
    success: boolean;
    username?: string; // Optional: only included if authentication is successful
    password?: string; // Optional: included for demonstration, but storing passwords like this is not secure
}

// The main Login component
const Login = () => {
    // State management for the form and login status
    const [state, formAction] = useFormState(handleSubmit, null);
    const [login, setLogin] = useState(false);

    // Hook to programmatically navigate between routes
    const router = useRouter()

    // Debugging to console to track login state changes
    console.log("loginstate");

    // Handles form submission and authentication logic
    async function handleSubmit(currentState: string | undefined, formData: FormData) {
        const returnAuth: AuthResponse = await authenticate(formData);

        // Check if authentication was successful
        if (returnAuth.success) {
            console.log("Login")
            setLogin(true) // Update login state
            // Store user credentials in localStorage (note: storing passwords is generally discouraged)
            localStorage.setItem('username', returnAuth.username!);
            localStorage.setItem('password', returnAuth.password!);
        }
        else {
            return false; // Authentication failed
        }
    }

    // React effect hook that triggers navigation to the dashboard upon successful login
    useEffect(() => {
        if (login) {
            router.push('/dashboard')
        }
    }, [login]); // Depend on the login state

    // Render the login form
    return (
        <div className="text-center">
            <h1 className="font-bold text-white text-xl text-center"> Login </h1>
            <form action={formAction} id="loginForm"
                className="flex flex-col items-center ">
                <p className="font-bold text-xl mb-2 font-mono text-white"> Username </p>
                <input className="font-bold text-md p-2 rounded-sm"
                    name="username"
                    id="username"
                    type="username"
                    placeholder='Username'
                    required />

                <p className="font-bold text-lg font-mono text-white"> Password </p>

                <input className="font-bold font-mono text-md p-2 rounded-sm mb-2"
                    name="password"
                    id="password"
                    type="password"
                    placeholder='Password'
                    required />

                <button className="w-3/4 font-mono font-bold text-md bg-ui-button hover:bg-ui-button-hover text-white p-2 m-3 rounded-2xl px-2"
                    type='submit'>
                    Login
                </button>

            </form>
        </div>
    )
}

// Export the component to be used in other parts of the application
export default Login;
