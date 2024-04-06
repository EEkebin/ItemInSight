import { Item } from "@/app/lib/definition"
import { useState } from 'react'
import Image from "next/image";

const ItemGrid: React.FC<{items : Item[]}> = (props) => {
    const [itemsList, setItems] = useState<Array<Item>>(props.items);

    return(
        <div className="flex flex-col items-center ">
            <h1 className="font-bold text-xl text-white">Items</h1>
            <div className="grid grid-cols-3  w-full h-full">
            {itemsList.map((item, index) => (
            <div key={index} className="cursor-pointer hover:md:animate-wiggle flex flex-col justify-start items-center bg-grid-item w-64 h-80 m-2 p-5 rounded-md text-center text-white font-bold shadow-lg shadow-ui-button" >
                {item.name}
                <Image className="w-3/4 h-1/2"
                src={item.photoUrl}
                width={200}
                height={200}
                alt="item"
                />
                <h1 className="font-bold text-white text-center">{item.itemDesc}</h1>
            </div>
            ))}
        </div>
    </div>
    )
}

export default ItemGrid