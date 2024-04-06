import { signup } from '../../lib/action';
import { useFormState } from 'react-dom'

const Signup = () => {

    const [errorMessage, dispatch] = useFormState(signup, undefined);

    return (
        <div className="text-center"> 
            <h1 className="font-bold text-white text-xl text-center p-5"> Signup </h1>
            <form action={dispatch} 
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
                <input className="font-bold text-md p-2 rounded-sm mb-2"
                name="password-rentry"
                id="password-rentry"
                type="password" 
                placeholder='Re-enter Password'
                required/>
                <button className="font-bold text-xl bg-ui-button hover:bg-ui-button-hover text-white p-3 rounded-md px-5"
                type='submit'>
                    Signup
                </button>
            
            </form>
        </div>
    )
}
export default Signup;
