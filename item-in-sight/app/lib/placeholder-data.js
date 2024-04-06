const itemPlaceHolder = [
    {
        name: "item1",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
    {
        name: "item2",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
    {
        name: "item3",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
    {
        name: "item4",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
    {
        name: "item5",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
    {
        name: "item6",
        locations: ["Location1", "Location2"],
        url: "testurl",
        photoUrl: "/itemTemp.png",
        itemDesc: "Item Desc"
    },
]


const locationPlaceHolder = [
    {
        name: "location1",
        items: ["item1", "item2"],
        parentLocation: "",
        locations: ["location2", "Location3"],
        url: "testurl",
        photoUrl: "/houseTemp.png",
        locationDesc: "Location Desc"
    },
    {
        name: "location2",
        items: ["item1", "item2"],
        parentLocation: "location1",
        locations: [],
        url: "testurl",
        photoUrl: "/houseTemp.png",
        locationDesc: "Location Desc"
    },
    {
        name: "location3",
        items: ["item1", "item2"],
        locations: [],
        parentLocations: "location1",
        url: "testurl",
        photoUrl: "/houseTemp.png",
        locationDesc: "Location Desc"
    },
    // {
    //     name: "location4",
    //     items: ["item1", "item2"],
    //     locations: ["Location1", "Location2"],
    //     url: "testurl",
    //     photoUrl: "/houseTemp.png",
    //     locationDesc: "Location Desc"
    // },
    // {
    //     name: "location5",
    //     items: ["item1", "item2"],
    //     locations: ["Location1", "Location2"],
    //     url: "testurl",
    //     photoUrl: "/houseTemp.png",
    //     locationDesc: "Location Desc"
    // },
    // {
    //     name: "location6",
    //     items: ["item1", "item2"],
    //     locations: ["Location1", "Location2"],
    //     url: "testurl",
    //     photoUrl: "/houseTemp.png",
    //     locationDesc: "Location Desc"
    // },
]

module.exports = {
    itemPlaceHolder,
    locationPlaceHolder
}