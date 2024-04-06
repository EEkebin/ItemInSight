'use client'
import  Login  from './Components/Login/Login';
import Logout  from './Components/Signup/Signup';
import { useState } from 'react';

export default function Home() {

 const [login, setLogin] = useState(true);
  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center">
      <div className="w-1/4 min-h-1/2 max-h-3/4 bg-ui-button rounded-md text-center"> 
       {login ? <Login/> : <Logout/>}
       <button className="font-bold text-xl bg-ui-button hover:bg-ui-button-hover text-white p-3 rounded-md px-5" onClick={() => setLogin(!login)}>
          Change to {login ? "Signup" : "Login"}
        </button>
       </div>
    </div>
  );
}
