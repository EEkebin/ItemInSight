// Directive to optimize this module for server-side usage in Next.js
'use server'

// Import necessary modules
import { error } from "console";
import { redirect } from 'next/navigation'
import crypto from 'crypto'

// Function to authenticate a user with given form data
export async function authenticate(formData: FormData) {
    console.log("authenticate function called");
    // Extract username and password from form data
    const username = formData.get("username");
    let password = formData.get("password");
    console.log(username + " " + password)

    // Validation checks for username and password
    if (typeof username !== 'string' || !username) throw new Error("Username not provided");
    if (typeof password !== 'string' || !password) throw new Error("Password not provided");

    // Hash the password using SHA-256 for secure storage
    password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(JSON.stringify({ username, password }));

    // Send a POST request to authenticate the user
    const response = await fetch("https://item-in-sight-staging-027791941423.herokuapp.com/getuser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    // Return success status and user info if authentication succeeds
    if (response.ok) {
        return { success: true, username: username, password: password };
    }
    else {
        // Return false if authentication fails
        return false;
    }
}

// Function to sign up a new user with provided form data
export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    // Check if the password and re-entry match
    if (formData.get("password-rentry") != formData.get("password")) {
        throw new Error("Passwords don't match")
    }

    // Extract username and password from form data
    const username = formData.get("username");
    let password = formData.get("password");
    console.log(username + " " + password)

    // Validation checks for username and password
    if (typeof username !== 'string' || !username) throw new Error("Username not provided");
    if (typeof password !== 'string' || !password) throw new Error("Password not provided");

    // Hash the password using SHA-256 for secure storage
    password = crypto.createHash('sha256').update(password).digest('hex');

    // Send a POST request to register the new user
    const response = await fetch("https://item-in-sight-staging-027791941423.herokuapp.com/setuser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    });

    // Return true if sign-up succeeds, otherwise return false
    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
}

// Function to get location - it appears to be a stub or placeholder as it mirrors the signup function
export async function getlocation(
    prevState: string | undefined,
    formData: FormData
) {
    // This function currently mimics the signup function, which may be an error
    // Future implementation for getting location should be placed here
}
