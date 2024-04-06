import { Location } from "@/app/lib/definition"
import { useState } from 'react'
import  LocationCard from './LoctionCard'
const LocationGrid: React.FC<{locations : Location[]}> = (props) => {
    const [locationList, setLocation] = useState<Array<Location>>(props.locations);
    console.log(locationList)
    return(
        <div className="flex flex-col items-center w-full">
        <h1 className="font-bold text-xl text-white">Location : {props.locations[0].parentLocation}</h1>
        <div className="grid grid-cols-3 space-x-10 w-full h-full ">
        {locationList.map((location, index) => (
            <LocationCard  key={index} location={location} />
        ))}
      </div>
        </div>
        
    )
}

export default LocationGrid;