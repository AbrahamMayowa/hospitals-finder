import React from 'react'
import AuthForm from '../components/AuthForm'



const Signup=({handleSignup, error, loading}:any)=>{
    return (
        <div>
            <AuthForm isLogin={false} loading={loading} authFunc={handleSignup} error={error}/> 
        </div>
          
    )
}

export default Signup