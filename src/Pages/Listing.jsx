import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import {Swiper, SwiperSlide} from "swiper/react"
import SwiperCore, {EffectFade, Autoplay, Navigation,Pagination} from "swiper"
import "swiper/css/bundle"
import { FiShare2 } from "react-icons/fi";
import { FaMapMarkerAlt, FaBed, FaBath, FaParking,FaChair  } from "react-icons/fa";

export default function Listing() {
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const[shareLinkCopied, setShareLinkCopied] = useState(false)
    SwiperCore.use([
        Autoplay,
        Navigation,
        Pagination,
    ])
    useEffect(()=>{
        async function fetchListing() {
            const docRef = doc(db,"listings",params.listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setListing(docSnap.data())
                setLoading(false)
                
            }
        }
        fetchListing();
        
    }, [params.listingId,]);
    if(loading){
        return <Spinner/>
    }

  return (
    <main>
        <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}}
        effect="fade" modules={[EffectFade]} autoplay={{delay: 3000}}>
            {listing.imgUrls.map((url,index)=>(
                <SwiperSlide key={index}>
                    <div className='relative w-full overflow-hidden h-[300px]' 
                    style=
                    {{background:`url(${listing.imgUrls[index]})center no-repeat`,
                    backgroundSize: "cover"}}>
                        
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <div className=' fixed top-[8%] right-[3%] z-10
        bg-white border-gray-400 rounded-full cursor-pointer border-2 w-12 h-12
       flex justify-center items-center ' onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(()=>{
            setShareLinkCopied(false)
        }, 2000)
       }}>
                <FiShare2 className='text-lg text-slate-500'>

                </FiShare2>
        </div>
        {shareLinkCopied && (
            <p className='fixed top-[8%] right-[10%] font-semibold border-2
            border-color-gray-400 rounded-md bg-white z-10 p-2'>Link Copied</p>
        )}

        <div className='flex flex-col md:flex-row max-w-6xl lg:mx-auto m-4 p-4 rounded-lg
         bg-white space-x-2'>
            <div className=' w-full h-[200px] lg-[400px] '>
                <p className='text-2xl font-bold mb-3 text-blue-900'>
                    {listing.name} - ${listing.offer ? listing.discountedPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","):
                    listing.regularPrice.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month": ""}
                    
                </p>
                <p className='flex items-center mt-6 mb-3 text-semibold'>
                    <FaMapMarkerAlt className='text-green-700 mr-1'/>
                    {listing.address}</p>
                <div className='flex justify-start items-center w-full space-x-4'>
                    <p className='bg-red-600 w-full max-w-[200px]
                    text-center rounded-md p-1 font-semibold shadow-md text-white'>
                    {listing.type === "rent" ? "Rent": "Sale"}
                    </p>
                   
                    {listing.offer && (
                         <p className=' w-full max-w-[200px] bg-green-600
                         text-center rounded-md p-1 font-semibold shadow-md text-white
                         '>${listing.regularPrice - listing.discountedPrice} discounted</p>
                        )}
                </div>
                <p className='mt-3 mb-3'>
                    <span className=' font-semibold' >
                    Description -  
                    </span>
                    {listing.description}
                </p>
                <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold'>
                    <li className='flex item-center whitespace-nowrap'>
                        <FaBed className='text-lg mr-1'/>
                        {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds`: 
                        "1 bed "}
                    </li>
                    <li className='flex item-center whitespace-nowrap'>
                        <FaBath className='text-lg mr-1'/>
                        {+listing.bathroom > 1 ? `${listing.bathroom} Baths`: 
                        "1 bath "}
                    </li>
                    <li className='flex item-center whitespace-nowrap'>
                        <FaParking className='text-lg mr-1'/>
                        {+listing.parking ? "Parking Spot" : 
                        "No Parking "}
                    </li>
                    <li className='flex item-center whitespace-nowrap'>
                        <FaChair className='text-lg mr-1'/>
                        {+listing.furnish ? "Furnished" : 
                        "Not Furnished "}
                    </li>
                </ul>
            </div>
            <div className='bg-blue-300 w-full h-[200px] lg-[400px]'></div>
        </div>

    </main>
  )
}
