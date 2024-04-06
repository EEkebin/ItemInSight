import { Item } from "@/app/lib/definition"
import { useState } from 'react'
import Image from "next/image";

const ItemGrid: React.FC<{items : Item[]}> = (props) => {
    const [itemsList, setItems] = useState<Array<Item>>(props.items);

    return(
        <div className="flex flex-col items-center w-full my-10">
            <h1 className="font-bold text-xl text-white mb-5">Items</h1>
            <div className="grid grid-cols-3 space-10 place-items-center w-full h-full">
            {itemsList.map((item, index) => (
            <div key={index} className="flex flex-col cursor-pointer justify-start items-center hover:md:animate-wiggle bg-grid-item w-3/4 h-3/4 rounded-md text-center text-white font-bold shadow-lg shadow-ui-button my-10 p-5" >
                {item.name}
                <Image 
                src={item.photoUrl}
                width={150}
                height={150}
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