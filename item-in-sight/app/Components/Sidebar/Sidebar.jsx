'use client'
import React from "react";
import Link from 'next/link'

export const Sidebar = () => {
    return(
        <div className="flex w-36 pt-10 flex-col items-end bg-ui-button">
        <Link href="\dashboard" className="w-full p-3 text-lg  text-center	 border-1 bg-ui-button hover:bg-ui-button-hover"> Home </Link>
        <Link href="\items" className="w-full p-3 text-lg text-center	 border-1 bg-ui-button hover:bg-ui-button-hover"> Items </Link>
        <Link href="\settings"className="w-full p-3 text-lg text-center	 border-1 bg-ui-button hover:bg-ui-button-hover"> Settings </Link>
        <Link href="\"className="w-full p-3  text-center text-lg  border-1 bg-ui-button hover:bg-ui-button-hover"> Logout </Link>


    </div>
    )
} 