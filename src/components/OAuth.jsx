import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { Await, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../firebase'

export default function OAuth() {
  const navigate = useNavigate()
  async function onGoogleClick() {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      
      //check for the user

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/")

    } catch (error) {
      toast.error("Could not authorize with Google")
      
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='text-white bg-orange-400
    flex items-center
    justify-center w-full px-7 py-3
    rounded uppercase font-medium
    hover:bg-orange-700 active:bg-orange-900
    shadow-md
    transition duration-150 ease-in-out'><FcGoogle
    className='text-2xl bg-white rounded-full mx-4'/>Continue whit Google</button>
  )
}
