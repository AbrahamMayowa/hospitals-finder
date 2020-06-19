import React from 'react'
import {LocationCard} from './LocationCard'
import '../styles/hospitalList.css'
import {NoSearch} from '../components/NoSearch'

interface LocationProps {
    hospitals: any[] 
}

export const HospitalList=({hospitals}: LocationProps)=>{

    if(hospitals.length <= 0){
        return <NoSearch message="Input does't  match any place in our record."/>
    }
    return(
        <div className='item-list'>
             <div className='item-card-wrapper'>
                {hospitals.map(item =><LocationCard locationDetails={item} />)}
            </div>
        </div>
       
    )
}