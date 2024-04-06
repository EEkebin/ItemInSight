// Import the signup function from the actions library for authentication purposes
import { signup } from '../../lib/action';
// Import the useFormState hook from React for form state management
import { useFormState } from 'react-dom'

// Define the Signup functional component
const Signup = () => {
    // useFormState hook is used to manage the form's state. 'signup' function is passed as the handler
    const [errorMessage, dispatch] = useFormState(signup, undefined);

    // Render method returns JSX for the Signup form
    return (
        // Container div with text alignment to center
        <div className="text-center">
            {/* Heading displaying "Signup" */}
            <h1 className="font-bold text-white text-xl text-center p-5"> Signup </h1>
            {/* Form element with 'dispatch' function passed as the action. This form is styled and structured for user inputs */}
            <form action={dispatch}
                className="flex flex-col items-center">
                {/* Label for email/username input */}
                <p className="font-bold text-xl mb-2 text-white"> Email </p>
                {/* Input field for email/username, required for form submission */}
                <input className="font-bold text-md p-2 rounded-sm mb-5"
                    name="username"
                    id="username"
                    type="username"
                    placeholder='Username'
                    required />

                {/* Label for password input */}
                <p className="font-bold text-lg text-white"> Password </p>

                {/* Input field for password, required for form submission */}
                <input className="font-bold text-md p-2 rounded-sm mb-5"
                    name="password"
                    id="password"
                    type="password"
                    placeholder='Password'
                    required />
                {/* Input field for password re-entry, required for form submission to confirm password */}
                <input className="font-bold text-md p-2 rounded-sm mb-5"
                    name="password-rentry"
                    id="password-rentry"
                    type="password"
                    placeholder='Re-enter Password'
                    required />
                {/* Submit button for the form with styling */}
                <button className="w-3/4 font-mono font-bold text-md bg-ui-button hover:bg-ui-button-hover text-white p-2 m-3 rounded-2xl px-2"
                    type='submit'>
                    Signup
                </button>

            </form>
        </div>
    )
}

// Export the Signup component to be used elsewhere in the application
export default Signup;
