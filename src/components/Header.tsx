import React from 'react'
import '../styles/header.css'
import {
    BrowserRouter as Router,
    useHistory,
    NavLink
  } from "react-router-dom"

const Header =({isAuth, handleSignout}:any)=>{
    return(
        <div className='header-container'>
            <NavLink className='website-name' to='/'>Hospitalfinder</NavLink>
           
                {isAuth ? (
                    <div className='header-link-wrapper'>
                        <NavLink className='header-link history' to='/activities'>Search History</NavLink>
                        <div className='header-link' onClick={()=>handleSignout()}>Logout </div>
                    </div>
                ): (
                    <div className='header-link-wrapper'>
                        <NavLink className='header-link' to='/login'>Login</NavLink>
                        <NavLink className='header-link' to='/signup'>Signup</NavLink>
                    </div>
                )}
        </div>
    )
}

export default Header