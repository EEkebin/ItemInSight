'use client'
import { Item, Location } from '@/app/lib/definition'
import { useState } from 'react'
import ItemGrid from './ItemGrid'
import LocationGrid from './LocationGrid'

// Grid container for location and item grid elements.
const Grid: React.FC<{items : Item[], locations : Location[]}> = (props) => {
   
    return(
        <div className="flex flex-col justify-center items-center m-2">
            {/* Grid containg location elements */}
           <LocationGrid locations={props.locations} />

           {/* Grid containg item elements */}
           <ItemGrid items={props.items} />
        </div>
    )
}
export default Grid;