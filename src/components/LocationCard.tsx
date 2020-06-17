import React from 'react';
import '../styles/itemCard.css'

interface LocationInterface{
    business_Status: string | null
     formatted_address: string | null
     geometry: object | null
     name: string
     rating: number
     user_rating_total: number
     photo: any[]
     distance: number
 }
 
interface LocationProps {
    locationDetails: LocationInterface
}

export const LocationCard=({locationDetails}: LocationProps)=>{
    return(
       
            <div className='card-info'>
                <div className='name'>{locationDetails.name}</div>
                <div className='address-distance'>
                    {locationDetails.formatted_address}
                </div>
                <div className='business-rating'>
                   
                    <span className='rating'>Rating:  {locationDetails.rating}</span>
                </div>
            </div>
    )
}