'use client'
import  Login  from './Components/Login/Login';
import Logout  from './Components/Signup/Signup';
import { useState } from 'react';

export default function Home() {

 const [login, setLogin] = useState(true);
  return (
    <div className="bg-main-background flex w-screen h-screen flex-col items-center justify-center">
      <div className="font-mono w-1/4 min-h-1/2 max-h-3/4 bg-main-background rounded-md text-center shadow-lg shadow-ui-button"> 
       {login ? <Login/> : <Logout/>}
       <button className="w-3/4 font-mono font-bold text-md bg-ui-button hover:bg-ui-button-hover text-white p-2 m-3 rounded-2xl px-2" onClick={() => setLogin(!login)}>
          {login ? "Signup" : "Login"}
        </button>
       </div>
    </div>
  );
}
