import React from 'react'
import medical from '../files/medical.svg'
import '../styles/noItem.css'
import { message } from 'antd'


interface PropsObject{
    message?: string 
}
export const NoSearch=({message}: PropsObject)=>{


    return (
        <div className='no-search-wrapper'>
            <div className='no-search-image-wrapper'>
                <img src={medical} />
            </div>
            <div className='no-search-text'>    
                {message ? message: 'No recent search yet. Check your search history.'}
            </div>
        </div>
    )
}