import React, { Suspense } from 'react'
import  Layout from '../Components/Layout/Layout';


const DashboardDisplay = () => { 
    return ( 
        <div className="w-32 h-screen">
            <h1>Dashboard</h1>
        </div>
    )
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