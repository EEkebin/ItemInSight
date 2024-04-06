'use client'
import React from "react";
import Link from 'next/link'

export const Navbar = () => {
    return(
        <div className="flex w-screen flex-row justify-center items-center bg-navbar">
            <Link href="\dashboard" className="p-3 px-8 text-md  text-center text-white border-1 bg-navbar hover:bg-ui-button-hover"> Home </Link>
            <Link href="\items" className=" p-3 px-8 text-md text-center	text-white border-1 bg-navbar hover:bg-ui-button-hover"> Items </Link>
            <Link href="\settings"className=" p-3 px-8 text-md text-center	 text-white border-1 bg-navbar hover:bg-ui-button-hover"> Settings </Link>
                <Link href="\"className="p-3 px-8 text-center text-md text-white  border-1 bg-navbar hover:bg-ui-button-hover"> Logout </Link>
        </div>
    )
} 