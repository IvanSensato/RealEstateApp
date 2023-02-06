import React from 'react'

export default function ListingItem({listing, id}) {
  return (
    <div className='text-white'>{listing.name}</div>
  )
}
