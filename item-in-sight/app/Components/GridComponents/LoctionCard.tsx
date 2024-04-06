'use client'
import {Location } from '@/app/lib/definition'
import { redirect } from 'next/dist/server/api-utils';
import Image from "next/image";
import { useRouter } from 'next/navigation'
const LocationCard: React.FC<{location : Location}> = (props) => {
    function handleClick () {
        const router = useRouter();
        router.push({
            pathname: '/about',
            query: { name: 'Someone' }
        }, '/about');
    }
    console.log(props.location.photoUrl)
    return( 
        <div onClick={handleClick} className="flex flex-col cursor-pointer justify-start items-center hover:md:animate-wiggle bg-grid-item w-3/4 h-3/4 m-7 p-5 rounded-md text-center text-white font-bold shadow-lg shadow-ui-button my-10" >
        {props.location.name}
            <Image 
            src={props.location.photoUrl}
            width={150}
            height={150}
            alt="item"
            />
            <h1 className="font-bold text-white text-center">{props.location.locationDesc}</h1>
        </div>
    )
}

export default LocationCard;