'use client'
import GridItem from './GridItem'
import GridLocation from './GridLocation'
import { Item, Location } from '@/app/lib/definition'
import { useState } from 'react'
import Image from 'next/image'

const Grid: React.FC<{items : Item[], locations : Location[]}> = (props) => {

    const [itemsList, setItems] = useState<Array<Item>>(props.items);
    const [locationsList, setLocations] = useState<Array<Location>>(props.locations);
    //console.log(itemsList)
    return(
        <div>
            <div className="grid grid-cols-3  w-full h-full">
            {itemsList.map((item, index) => (
            <div key={index} className="bg-grid-item w-64 h-80 m-2 p-5 rounded-md text-center text-white font-bold" >
                {item.name}
                <Image
                src={item.photoUrl}
                width={100}
                height={100}
                alt="item"
                />
            </div>
            ))}
          </div>
        </div>
    )
}

export default Grid;