'use client'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';
import { authenticate } from '../../lib/action';

interface AuthResponse {
    success: boolean;
    username?: string; // Optional because it might not be present on failure
    password?: string; // Optional for the same reason, and storing passwords in localStorage is generally discouraged
}

const Login = () => {
    const [state, formAction] = useFormState(handleSubmit, null);
    const [login, setLogin] = useState(false);
    const router = useRouter()
    console.log("loginstate");
    async function handleSubmit(currentState: string | undefined, formData: FormData) {
        const returnAuth: AuthResponse = await authenticate(formData);
        if (returnAuth.success) {
            console.log("Login")
            setLogin(true)
            localStorage.setItem('username', returnAuth.username!);
            localStorage.setItem('password', returnAuth.password!);
        }
        else {
            return false;
        }
    }
    useEffect(() => {
        if (login) {
            router.push('/dashboard')
        }
    }, [login]);

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
export default Login;
