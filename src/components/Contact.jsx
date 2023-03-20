import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef,listing}) {
    const [landlord, setLandlord]= useState(null)
    const [message, setMessage]= useState("")
  useEffect(()=>{
    async function getLandlord(){
        
        const docRef = doc(db, "users", userRef)
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setLandlord(docSnap.data())
        } else{
            toast.error("Could not get landlord data")
        }
    }
    getLandlord();
  }, [userRef]);
  function onChange(e){
    setMessage(e.target.value)
  }
  return <>{landlord !== null && (
    <div className='flex flex-col w-full'>
        <p>Contact {landlord.name} for the {listing.name.toLowerCase()}</p>
        <div className='mb-6 mt-3'>
            <textarea 
            name="message" 
            id="message" 
            rows="2" 
            value={message}
            onChange={onChange}
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white rounded
            transition duration-150 ease-in-out "  
            ></textarea>
        </div>
       
            <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                <button className='px-7 py-3 bg-blue-600 text-white rounded shadow-md
                hover:bg-blue-700 text-sm uppercase  focus:bg-blue-700  active:bg-blue-800
                w-full text-center mb-6'
                type='button'>
                    Send Message
                </button>
            </a>
        
    </div>
  )}</>
}
