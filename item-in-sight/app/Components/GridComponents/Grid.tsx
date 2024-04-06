'use client'
import { Item, Location } from '@/app/lib/definition'
import { useState } from 'react'
import ItemGrid from './ItemGrid'
import LocationGrid from './LocationGrid'


const Grid: React.FC<{items : Item[], locations : Location[]}> = (props) => {
   
    return(
        <div className="flex flex-col justify-center items-center m-2">
           <LocationGrid locations={props.locations} />
           <ItemGrid items={props.items} />
        </div>
    )
}
export default Grid;