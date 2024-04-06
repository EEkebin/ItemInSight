
import React, { Suspense } from 'react'
import  Layout from '../Components/Layout/Layout';
import Grid from '../Components/GridComponents/Grid'
import { Item, Location } from '@/app/lib/definition'
import { itemPlaceHolder, locationPlaceHolder } from '@/app/lib/placeholder-data'
import ItemsList from '../Components/GridComponents/GridItem';

let fullfilled = false;
let promiseItem : Promise<Item[]>;
let dataItem : Item[];
let promiseLocation : Promise<Location[]>;
let dataLocation : Location[];
let data : [Item[], Location[]]

function getItems(user: string) {
  return itemPlaceHolder
}

function getLocations(user : string) {
  return locationPlaceHolder
}
export const fetchItems = () => {
  if (!fullfilled) {
    if(!promiseItem)
    {
      promiseItem = new Promise(async (resolve) => {
        const resItems = await getItems("testUser")
        dataItem = resItems;
        resolve(dataItem)
        //console.log("Resolved Items")
        });
    }
    else {
      throw promiseItem
    }
  }
}

export const fetchLocations = () => {
  //console.log("fetch Locations")
  if (!fullfilled) {
    if(!promiseLocation) {
      promiseLocation = new Promise(async (resolve) => {
      const resLocations = await getLocations("testUser")
      dataLocation = resLocations;
      resolve(resLocations)
      //console.log("Resolved Locations")
      });
    }
    else {
      throw promiseLocation
    }
  }
}

async function  DashboardDisplay () { 
  await fetchItems();
  await fetchLocations();
  return  <Grid items={dataItem} locations={dataLocation}/>
}
function Dashboard() {
    return (
      <Layout>
        <Suspense fallback={"Loading... "}>
          <DashboardDisplay/>
        </Suspense>
      </Layout>
    )
  }

  export default Dashboard;