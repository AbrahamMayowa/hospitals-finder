import React from 'react'
import medical from '../files/medical.svg'
import '../styles/noItem.css'

export const NoSearch=()=>{

    return (
        <div className='no-search-wrapper'>
            <div className='no-search-image-wrapper'>
                <img src={medical} />
            </div>
            <div className='no-search-text'>
                No search yet.
            </div>
        </div>
    )
}
