import React from 'react'
import {FcGoogle} from 'react-icons/fc'

export default function OAuth() {
  return (
    <button className='text-white bg-orange-400
    flex items-center
    justify-center w-full px-7 py-3
    rounded uppercase font-medium
    hover:bg-orange-700 active:bg-orange-900
    shadow-md
    transition duration-150 ease-in-out'><FcGoogle
    className='text-2xl bg-white rounded-full mx-4'/>Continue whit Google</button>
  )
}
