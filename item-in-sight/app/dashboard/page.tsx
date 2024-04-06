'use client'
import React, { Suspense, useEffect } from 'react'
import  Layout from '../Components/Layout/Layout';
import Grid from '../Components/GridComponents/Grid'
import { Item, Location } from '@/app/lib/definition'
import { itemPlaceHolder, locationPlaceHolder } from '@/app/lib/placeholder-data'
import { usePathname } from 'next/navigation'
import { withRouter } from 'next/router'
import { useRouter } from 'next/router'

let fullfilled = false;
let promiseItem : Promise<Item[]>;
let dataItem : Item[];
let promiseLocation : Promise<Location[]>;
let dataLocation : Location[];

function getItems(user: string) {
  return itemPlaceHolder
}

function getLocations(locationName : string) {
  
  // const filteredArray = itemPlaceHolder.filter(item => item.name === locationName)
  // console.log(filteredArray)
  let temp: Array<Location> = []
  temp.push(locationPlaceHolder[1]) 
  temp.push(locationPlaceHolder[2]) 
  //temp.push(filteredArray)
  return temp
}
export const fetchItems = () => {
  if (dataItem != null) return
  if (!fullfilled) {
    if(!promiseItem)
    {
      promiseItem = new Promise(async (resolve) => {
        const resItems = await getItems("testUser")
        dataItem = resItems;
        resolve(dataItem)
        });
    }
    else {
      throw promiseItem
    }
  }
}

export const fetchLocations = () => {
  if (dataLocation != null) return
  if (!fullfilled) {
    if(!promiseLocation) {
      promiseLocation = new Promise(async (resolve) => {
      const resLocations = await getLocations("testUser")
      dataLocation = resLocations;
      resolve(resLocations)
      });
    }
    else {
      throw promiseLocation
    }
  }
}

async function  DashboardDisplay (pathname: string) { 
  let path = pathname.path.substring(10)
  console.log(pathname)
  await fetchItems();
  await fetchLocations();
  console.log("grid loading")
  return  <Grid items={dataItem} locations={dataLocation}/>
}
const Dashboard = (props) => {
  useEffect(() => {
    console.log("dashboard props: " + props.router);
}, [props]);

  const pathname = usePathname()
    return (
      <Layout>
        <Suspense fallback={"Loading... "}>
          <DashboardDisplay path={pathname} />
        </Suspense>
      </Layout>
    )
  }

  export default Dashboard;