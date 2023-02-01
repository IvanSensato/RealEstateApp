import React, { useState } from 'react'
import Spinner from '../components/Spinner'

export default function CreateListing() {
    const [geolocationEnabled, setGeolocationEnable] = useState(true);
    const [loading, setLoading ] = useState(false);
    const[formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bath: 1,
        parking: false,
        furnished: false,
        address: "",
        description: "",
        offer: false,
        regularPrice:0,
        discountedPrice:0,
        latitude: 0,
        longitude: 0,
    });
    const { type, name, bedrooms, bath, parking, furnished, address, description,
    offer, regularPrice, discountedPrice, latitude, longitude } = formData;

function onChange(e){
  let boolean = null;
  if (e.target.value === "true"){
    boolean = true;
  }
  if (e.target.value === "false"){
    boolean = false;
  }
  if (e.target.files){
    setFormData((prevState)=> ({
      ...prevState,
      images: e.target.files,
    }));
  }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  
}

function onSubmit(e){
  e.preventDefault();
  setLoading(true);
}

if (loading){
  return <Spinner> </Spinner>
}
  return (
    <main className='max-w-md px-2 mx-auto text-white'>
        <h1 className='text-3xl text-white text-center mt-6 font-bold'>Create a Listing</h1>
        <form onSubmit={onSubmit}>
            <p className='text-lg mt-6 font-semibold'>Sell / Rent</p>
            <div className='flex'>
              <button type='button' id='type' value="sale"
              onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "rent" ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                sell
                </button>
                <button type='button' id='type' value="rent"
              onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "sale" ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                rent
                </button>    
            </div>
            <p className='text-lg mt-6 font-semibold'>Name </p>
            <input type="text" id='name' value={name} onChange=
            {onChange} placeholder="Property Name" maxLength="32" minLength="10" required
            className='w-full px-4 py-2 text-gray-700 border border-gray-300 rounded
            transition duration-150 ease-in-out focus:text-gray-700  focus:border-blue-600 focus:bg-white mb-6' />
            <div className='flex space-x-6 mb-6'>
                <div className=''>
                    <p className='text-lg font-semibold'>Beds</p>
                    <input type="number" id='bedrooms' value={bedrooms}
                    onChange={onChange} min="1" max="50" required
                    className='w-full px-4 py-2 text-xl text-gray-700 boarder border-gray-700 rounded 
                    transition duration-150 ease-in-out
                     focus:text-gray-700 focus:bg-white focus:border-blue-600' />
                </div>
                <div className=''>
                    <p className='text-lg font-semibold'>Baths</p>
                    <input type="number" id='bath' value={bath}
                    onChange={onChange} min="1" max="50" required
                    className='w-full px-4 py-2 text-xl text-gray-700 boarder border-gray-700 rounded 
                    transition duration-150 ease-in-out
                     focus:text-gray-700 focus:bg-white focus:border-blue-600' />
                </div>
            </div>
            <p className='text-lg font-semibold'>Parking spot</p>
            <div className='flex'>
              <button type='button' id='parking' value={true}
              onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                !parking ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                yes
                </button>
                <button type='button' id='parking' value={false}
              onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                parking ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                No
                </button>    
            </div>
            <p className='text-lg mt-6 font-semibold'>Furnished</p>
            <div className='flex mb-6'>
              <button type='button' id='furnished' value={true}
              onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                !furnished ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                yes
                </button>
                <button type='button' id='furnished' value={false}
              onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                furnished ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                No
                </button>    
            </div>
            
            <p className='text-lg font-semibold'>Address</p>
            <textarea type="text" id='address' value={address} onChange=
            {onChange} placeholder="Input address" maxLength="32" minLength="10" required
            className='w-full px-4 py-2 text-gray-600 border border-grey-300 rounded
            transition duration-150 ease-in-out focus:text-gray-700  focus:border-blue-600 focus:bg-white mb-6' />
              {!geolocationEnabled && (
              <div className='flex space-x-6 justify-start mb-6'>
                <div>
                  <p className='text-lg font-semibold'>Latitude</p>
                  <input type="number" id="latitude" value={latitude}
                  onChange={onChange} required
                  min="-90"
                  max="90"
                  className=' w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300
                  rounded transition duration-150 ease-out focus:border-blue-300 ' />
                </div>
                <div>
                  <p className='text-lg font-semibold'>Longitude</p>
                  <input type="number" id="longitude" value={longitude}
                  onChange={onChange} required
                  min="-180"
                  max="180"
                  className=' w-full px-4 py-2 text-xl text-center text-gray-700 bg-white border border-gray-300
                  rounded transition duration-150 ease-out focus:border-blue-300 ' />
                </div>
              </div>
            )}
            <p className='text-lg font-semibold'>Description</p>
            <textarea type="text" id='description' value={description} onChange=
            {onChange} placeholder="Input description" maxLength="32" minLength="10" required
            className='w-full px-4 py-2 text-gray-600 border border-grey-300 rounded
            transition duration-150 ease-in-out focus:text-gray-700  focus:border-blue-600 focus:bg-white mb-6' />
            
        <p className='text-lg  font-semibold'>Offer</p>
            <div className='flex mb-6'>
              <button type='button' id='offer' value={true}
              onClick={onChange} className={`mr-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                !offer ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                yes
                </button>
                <button type='button' id='offer' value={false}
              onClick={onChange} className={`ml-3 px-7 py-3 font-medium text-sm
              uppercase shadow-md rounded bg-white text-black hover:shadow-lg
              active:shadow-lg transition duration-150 ease-in-out w-full ${
                offer ? "bg-white": "bg-sensato-blue text-white"
              }`} >
                No
                </button>    
            </div>
            
            
              <div className='flex items-center mb-6'>
                <div className=''>
                   <p className='text-lg font-semibold'>Regular Price</p>
                  <div className='flex w-full items-center justify-center space-x-6'>
                    
                      <input type="number" id='regularPrice' value={regularPrice}
                        onChange={onChange} min="50" max="4000000" required={offer}
                        className='w-full px-4 py-2 text-xl text-gray-700 boarder border-gray-700 rounded 
                        transition duration-150 ease-in-out text-center
                       focus:text-gray-700 focus:bg-white focus:border-blue-600' />
                    
                    {type === "rent" &&(
                      <div>
                         <p className='w-full text-md whitespace-nowrap'>$ / Mont</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {offer && (
              <div className='flex items-center mb-6'>
                 <div className=''>
                 <p className='text-lg font-semibold'>Discounted Price</p>
                 <div className='flex w-full items-center justify-center space-x-6'>
                 <input type="number" id='discountedPrice' value={discountedPrice}
                     onChange={onChange} min="50" max="4000000" required={offer}
                     className='w-full px-4 py-2 text-xl text-gray-700 boarder border-gray-700 rounded 
                     transition duration-150 ease-in-out text-center
                      focus:text-gray-700 focus:bg-white focus:border-blue-600' />
                  {type === "rent" &&(
                    <div>
                        <p className='w-full text-md whitespace-nowrap'>$ / Mont</p>
                    </div>
                    )}
                 </div>
                 </div>
              </div>
              )}
            <div className='mb-6'>
                <p className='text-lg font-semibold'>Images</p>
                <p className='text-gray-600'>The first image will be the cover (max 6)</p>
                <input type="file" id="images" onChange=
                {onChange} accept=".jpg, .png, .jpeg"
                multiple
                required
                className='w-full px-3 py-1.5 text-gray-700 bg-white border
                border-gray-300 rounded transition duration-150 ease-in-out
                focus:bg-white focus:border-blue-600'
                 />
            </div>
            <button type="submit" className='mb-6 w-full px-7 py-3
            bg-sensato-blue text-white font-medium text-sm uppercase
            rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg active:bg-blue-800 active:shadow-lg transition
            duration-150 ease-in-out'>Create Listing</button>
        </form>
    </main>
  );
}
