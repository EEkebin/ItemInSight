'use server'
import { error } from "console";
import { redirect } from 'next/navigation'
var bcrypt = require('bcryptjs');
export async function authenticate(formData : FormData) {
    try {
        
        bcrypt
        .hash(formData.get("password"), 10)
        .then(hash => {
            console.log('Hash ', hash)
        })
        .catch(err => console.error(err.message))
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
        if (formData.get("password-rentry") != formData.get("password")) {
            throw new Error("Passwords don't match")
        }
        bcrypt
        .hash(formData.get("password"), 10)
        .then(hash => {
            console.log('Hash ', hash)
        })
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