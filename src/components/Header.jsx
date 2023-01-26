import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
    const [pageState, setPageState] = useState("Sign in")
    const location = useLocation();
    const navigate = useNavigate(); 
    const auth =getAuth ();
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user) {
                setPageState("Profile");
            } else{
                setPageState("Sign in");
            }
        });
    }, [auth]);
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true
        }
    }
  return (
    <div className='bg-black shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center
        px-3 max-w-6xl mx-auto'> 
            <div>
                <img src="https://uploads-ssl.webflow.com/62d68a7461e779076e5c772f/6304c2716a11c9c533e8c473_Sensato%20logo%20blanco-p-500.png" alt="logo" 
                className='h-10 cursor-pointer'
                onClick={()=>navigate("/")}
                />
            </div>
            <div>
                <ul className='flex space-x-10'>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-white border-b-[3px] border-b-transparent
                    ${pathMatchRoute("/") && "text-blue-300 border-b-blue-300"}`}
                    onClick={()=>navigate("/")}
                    >Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-white border-b-[3px] border-b-transparent
                    ${pathMatchRoute("/offers") && "text-blue-300 border-b-blue-300"}`}
                    onClick={()=>navigate("/offers")}
                    >Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-white border-b-[3px] border-b-transparent
                    ${pathMatchRoute("/sign-in")|| pathMatchRoute("/profile") && "text-blue-300 border-b-blue-300"}`}
                    onClick={()=>navigate("/profile")}
                    >{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
