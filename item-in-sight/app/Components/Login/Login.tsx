'use client'
import { authenticate } from '../../lib/action';
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

const Login = () => {
    const [state, formAction] = useFormState(handleSubmit, null);
    const [login, setLogin] = useState(false);
    const router = useRouter()
   async function handleSubmit(currentState: string | undefined, formData: FormData) {
        if(await authenticate(formData)) {
            console.log("test")
            setLogin(true)
           
        } 
    }
    useEffect(() => {
        if (login) {
            
            router.push('/dashboard')
         }
      }, [login]);

    return (
        <div className="text-center">
            <h1 className="font-bold text-white text-xl text-center p-5"> Login </h1>
            <form action={formAction} id="loginForm" 
            className="flex flex-col items-center p-4">
                <p className="font-bold text-xl mb-2"> Email </p>
                <input className="font-bold text-md p-2 rounded-sm"
                name="email"
                id="email"
                type="email" 
                placeholder='Email'
                required/>

                <p className="font-bold text-lg"> Password </p>

                <input className="font-bold text-md p-2 rounded-sm mb-2"
                name="password"
                id="password"
                type="password" 
                placeholder='Password'
                required/>

                <button className="font-bold text-xl bg-ui-button hover:bg-ui-button-hover text-white p-3 rounded-md px-5"
                type='submit'>
                    Login
                </button>
            
            </form>
        </div>
    )
}
export default Login;
