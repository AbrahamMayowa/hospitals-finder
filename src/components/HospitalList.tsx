import React from 'react'
import {LocationCard} from './LocationCard'
import '../styles/hospitalList.css'

interface LocationProps {
    hospitals: any[] | undefined
}

export const HospitalList=({hospitals}: LocationProps)=>{
    return(
        <div className='item-card-wrapper'>
            {hospitals?.map(item =><LocationCard locationDetails={item} />)}
        </div>
    )
}