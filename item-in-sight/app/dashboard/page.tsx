import React, { Suspense } from 'react'
import  Layout from '../Components/Layout/layout';


const Main = () => { 
    return ( 
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
export default function Dashboard() {
    return (
      <Layout>
        <Suspense fallback={"Loading... "}>
          <Main/>
        </Suspense>
      </Layout>
    )
  }