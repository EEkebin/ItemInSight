import { Location } from "@/app/lib/definition"
import { useState } from 'react'
import  LocationCard from './LoctionCard'

// Grid containg location cards
const LocationGrid: React.FC<{locations : Location[]}> = (props) => {

    //UseState for location list
    const [locationList, setLocation] = useState<Array<Location>>(props.locations);
    return(
        <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-xl text-white">Location : {props.locations[0].parentLocation}</h1>
        <div className="grid grid-cols-3 space-10 w-full h-full place-items-center">
        {/* Maps locations to location cards */}
        {locationList.map((location, index) => (
            <LocationCard  key={index} location={location} />
        ))}
      </div>
        </div>
        
    )
}

export default LocationGrid;