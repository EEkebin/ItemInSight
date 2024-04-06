'use client'
import React from "react";
import Link from 'next/link'

export const Navbar = () => {
    return(
        <div className="flex w-screen  flex-row items-end bg-ui-button">
            <Link href="\dashboard" className="w-full p-3 text-lg  text-center text-white border-1 bg-ui-button hover:bg-ui-button-hover"> Home </Link>
            <Link href="\items" className="w-full p-3 text-lg text-center	text-white border-1 bg-ui-button hover:bg-ui-button-hover"> Items </Link>
            <Link href="\settings"className="w-full p-3 text-lg text-center	 text-white border-1 bg-ui-button hover:bg-ui-button-hover"> Settings </Link>
            <Link href="\"className="w-full p-3  text-center text-lg text-white  border-1 bg-ui-button hover:bg-ui-button-hover"> Logout </Link>
        </div>
    )
} 