'use server'
import { error } from "console";
import { redirect } from 'next/navigation'
import crypto from 'crypto'

export async function authenticate(formData: FormData) {
    console.log("authenticate function called");
    const username = formData.get("username");
    let password = formData.get("password");
    console.log(username + " " + password)

    // Ensure username and password are strings
    if (typeof username !== 'string' || !username) throw new Error("Username not provided");
    if (typeof password !== 'string' || !password) throw new Error("Password not provided");
    password = crypto.createHash('sha256').update(password).digest('hex');
    console.log(JSON.stringify({ username, password }));
    const response = await fetch("https://item-in-sight-staging-027791941423.herokuapp.com/getuser",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        }
    );

    if (response.ok) {
        return { success: true, username: username, password: password };
    }
    else {
        return false;
    }
}

export async function signup(
    prevState: string | undefined,
    formData: FormData
) {
    if (formData.get("password-rentry") != formData.get("password")) {
        throw new Error("Passwords don't match")
    }
    const username = formData.get("username");
    let password = formData.get("password");
    console.log(username + " " + password)

    // Ensure username and password are strings
    if (typeof username !== 'string' || !username) throw new Error("Username not provided");
    if (typeof password !== 'string' || !password) throw new Error("Password not provided");
    password = crypto.createHash('sha256').update(password).digest('hex');

    const response = await fetch("https://item-in-sight-staging-027791941423.herokuapp.com/setuser",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        }
    );


    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
}


export async function getlocation(
    prevState: string | undefined,
    formData: FormData
) {
    if (formData.get("password-rentry") != formData.get("password")) {
        throw new Error("Passwords don't match")
    }
    const username = formData.get("username");
    let password = formData.get("password");
    console.log(username + " " + password)

    // Ensure username and password are strings
    if (typeof username !== 'string' || !username) throw new Error("Username not provided");
    if (typeof password !== 'string' || !password) throw new Error("Password not provided");
    password = crypto.createHash('sha256').update(password).digest('hex');

    const response = await fetch("https://item-in-sight-staging-027791941423.herokuapp.com/setuser",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        }
    );


    if (response.ok) {
        return true;
    }
    else {
        return false;
    }
}
