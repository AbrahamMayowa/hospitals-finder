import React from 'react'
import AuthForm from '../components/AuthForm'
import Header from '../components/Header'


const Login=({handleLogin, error, loading}: any)=>{
  
    return (
    <div>
        <AuthForm isLogin={true} loading={loading} authFunc={handleLogin} error={error}/>    
    </div>
    )
}

export default Login