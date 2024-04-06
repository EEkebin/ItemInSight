'use server'
import { error } from "console";
import { redirect } from 'next/navigation'

export async function authenticate(formData : FormData) {
    try {
        //await signIn('credentials', formData);
        console.log("test")
        console.log(formData.get("email"))
        console.log(formData.get("password"))
        
        return true
    } catch (error) {
        if (error) {
            switch(error) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';

                default:
                    console.log(error)
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        //await signIn('credentials', formData);
        console.log(formData.get("email"))
        console.log(formData.get("password"))
        console.log(formData.get("password-rentry"))
        if (formData.get("password-rentry") != formData.get("password")) {
            throw new Error("Passwords don't match")
        }
    } catch (error) {
        if (error) {
            switch(error) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials';

                default:
                    console.log(error)
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}