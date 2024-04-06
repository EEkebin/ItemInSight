// Optimize this component for client-side rendering in Next.js
'use client'

// Import React and Next.js Link component for navigation
import React from "react";
import Link from 'next/link'

// Define the Navbar component as a functional component
export const Navbar = () => {
    // Render method returns JSX for the navbar
    return (
        // Container div for the navbar with flex layout, centered items, and styling
        <div className="flex w-screen flex-row justify-center items-center bg-navbar border-b-1">
            {/* Link component for navigation to the dashboard. Includes styling for appearance and hover state. */}
            <Link href="/dashboard" className="p-3 px-8 text-md text-center text-white border-1 bg-navbar hover:bg-main-background"> Home </Link>

            {/* Link component for navigation to the items page. Styled similarly to the home link. */}
            <Link href="/items" className=" p-3 px-8 text-md text-center	text-white border-1 bg-navbar hover:bg-main-background"> Items </Link>

            {/* Link component for navigation to the settings page. Consistent styling with other links. */}
            <Link href="/settings" className=" p-3 px-8 text-md text-center	 text-white border-1 bg-navbar hover:bg-main-background"> Settings </Link>

            {/* Link component for logging out. It navigates to the root ('/') route on click. Styled in line with other navbar links. */}
            <Link href="/" className="p-3 px-8 text-center text-md text-white  border-1 bg-navbar hover:bg-main-background"> Logout </Link>
        </div>
    )
} 
