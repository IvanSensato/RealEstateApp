import React from 'react'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'
import {MdLocationOn} from "react-icons/md"

export default function ListingItem({listing, id}) {
  return (
  <li className='relative bg-sensato-blue flex flex-col justify-between
  items-center shadow-md hover:shadow-xl rounded-md overflow-hidden
  transition-shadow duration-150 m-[10px]'>
    <Link to ={`/category/${listing.type}/${id}`}>
      <img className='h-[170px] w-full object-cover
      hover:scale-105 transition-scale duration-200 ease-in
      '
      loading='lazy' 
      src={listing.imgUrls[1]} alt="" />
      <Moment className='absolute top-2 left-2 bg-[#3377cc] uppercase
      text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
        {listing.timestamp?.toDate()}
      </Moment>
      <div className='w-full p-[10px]'>
        <div className='flex items-center space-x-1'>
          <MdLocationOn className=' h-4 w-4 text-green-600 truncate'/>
         <p className='font-semibold text-sm mb-[2px]'>
         {listing.address}
          </p>
        </div>
        <p className='font-semibold mt-2 text-lg text-orange-400 truncate' >{listing.name}</p>
        <p className='font-semibold mt-2 '>${listing.offer ? listing.discountedPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
           :listing.regularPrice
           .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
           }
          {listing.type === "rent" && "/ month"} 
        </p>
        <div className='flex item-center mt-[10px] space-x-3'>
          <div className='flex item-center space-x-1'>
            <p className='font-bold text-xs'>{listing.bedrooms > 1 ? `${listing.bedrooms} Beds`
            : "1 Bed" }
            </p>
          </div>
          <div>
            <p className='font-bold text-xs'>{listing.bathrooms > 1 ?`${listing.bathrooms} Baths`: "1 Bath"}</p>
          </div>
        </div>
      </div>
    </Link>
  </li>
  )
  
}
