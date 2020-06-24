import React from 'react';
import '../styles/itemCard.css'
import { Card } from 'antd';

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
                 <Card title={locationDetails.name} bordered={false} style={{height: 200}}>
                 <div className='address-distance'>
                    {locationDetails.formatted_address}
                </div>
                <div className='business-rating'>
                   
                    <span className='rating'>Rating:  {locationDetails.user_rating_total}</span>
                </div>
                </Card>
                
            </div>
    )
}