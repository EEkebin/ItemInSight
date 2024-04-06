import { signup } from '../../lib/action';
import { useFormState } from 'react-dom'

const Signup = () => {

    const [errorMessage, dispatch] = useFormState(signup, undefined);

    return (
        <div className="text-center"> 
            <h1 className="font-bold text-white text-xl text-center p-5"> Signup </h1>
            <form action={dispatch} 
            className="flex flex-col items-center">
                <p className="font-bold text-xl mb-2 text-white"> Email </p>
                <input className="font-bold text-md p-2 rounded-sm mb-5"
                name="email"
                id="email"
                type="email" 
                placeholder='Email'
                required/>

                <p className="font-bold text-lg text-white"> Password </p>

                <input className="font-bold text-md p-2 rounded-sm mb-5"
                name="password"
                id="password"
                type="password" 
                placeholder='Password'
                required/>
                <input className="font-bold text-md p-2 rounded-sm mb-5"
                name="password-rentry"
                id="password-rentry"
                type="password" 
                placeholder='Re-enter Password'
                required/>
                <button className="w-3/4 font-mono font-bold text-md bg-ui-button hover:bg-ui-button-hover text-white p-2 m-3 rounded-2xl px-2"
                type='submit'>
                    Signup
                </button>
            
            </form>
        </div>
    )
}
export default Signup;
