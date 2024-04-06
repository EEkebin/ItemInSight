'use client'
import {Location } from '@/app/lib/definition'
import Image from "next/image";

const LocationCard: React.FC<{location : Location}> = (props) => {
    console.log(props.location.photoUrl)
    return( 
        <div className="flex flex-col cursor-pointer justify-start items-center hover:md:animate-wiggle bg-grid-item w-64 h-80 m-2 p-5 rounded-md text-center text-white font-bold shadow-lg shadow-ui-button" >
        {props.location.name}
            <Image className="w-3/4 h-1/2"
            src={props.location.photoUrl}
            width={200}
            height={200}
            alt="item"
            />
            <h1 className="font-bold text-white text-center">{props.location.locationDesc}</h1>
        </div>
    )
}

export default LocationCard;