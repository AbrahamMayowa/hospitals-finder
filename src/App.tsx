import React, { useState, useEffect} from 'react';
import './App.css';
import {Select} from 'antd'
import {Formik} from 'formik';
import { format } from 'path';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
  NavLink
} from "react-router-dom";
import Activities from './screen/Activities'
import Search from './screen/Search'
import Login from './screen/Login'
import Signup from './screen/Signup'
import PrivateRoute from './components/ProtectedRoute';
import firebaseConf, {firebaseAuth} from './firebaseclient';
import * as firebase from 'firebase/app';
import Header from './components/Header'



interface AuthState{
  token: string | undefined
  isAuth: boolean
  time: Date 
  loading: boolean,
  loginError: string
  signupError: string
}

function App() {
  const history = useHistory()

  const storageValue = localStorage.getItem('auth') as string //localstorage returned type was 'null | string' which not acceptable by Json parser

  //Dynamic state value base on the value of localstorage
  let stateValue: any

  if(storageValue){
    //if the localstorage key exist
    stateValue = JSON.parse(storageValue)
  }else{
    stateValue = {
      token: undefined,
      isAuth: false,
      time: new Date(),
      loading: false,
      loginError: '',
      signupError: ''
    }
  }


  
  const [auth, setAuth] = useState<AuthState>(stateValue)

  const refreshTokenDispatch=async()=>{
  if(new Date().getTime() > (new Date(auth.time).getTime() + 3000000)){
    //compare time to determine token expiration and get new token.
      // and clear the localstorage
      setAuth({
        token: undefined,
        isAuth: false,
        time: new Date(),
        loading: false,
        loginError: '',
        signupError: ''
      })
    }
    return;

  }
  


  useEffect(()=>{
    // updating localstorage
    localStorage.setItem('auth', JSON.stringify(auth))
    refreshTokenDispatch()
    
      let endInterval = setInterval(refreshTokenDispatch, 3000000)
      return ()=> clearTimeout(endInterval)

  }, [auth])


  const loginDispatch= async (email:string, password:string)=>{
    //set the loading state
    setAuth({
      ...auth,
      loading: true,
      loginError: ''
    })
    try{
      await firebaseAuth().signInWithEmailAndPassword(email, password)
      const userToken = await firebaseAuth().currentUser?.getIdToken()
      console.log(userToken)
      setAuth({
        ...auth,
        time: new Date(),
        token: userToken,
        isAuth: true,
        loading: false,
        loginError: ''
      })
      history.push('/')
      console.log(auth.token)
    }catch(error){
      setAuth({
        ...auth,
        loginError: 'Invalid password or email or user does not exist..',
        loading: false
      })
    }
    
  }



  const signupDispatch= async (email:string, password: string)=>{
    //set the loading state
    setAuth({
      ...auth,
      loading: true,
      signupError: ''
    })
    try{
      await firebaseAuth().createUserWithEmailAndPassword(email, password)
      const userToken = await firebaseAuth().currentUser?.getIdToken()
      setAuth({
        ...auth,
        time: new Date(),
        token: userToken,
        isAuth: true,
        loading: false,
        signupError: ''
      })
      history.push('/')
     
    }catch(error){
      setAuth({
        ...auth,
        signupError: 'The email has been taken or password should be atleast 6 characters long.',
        loading: false
      })

    }

  }



  
  const signoutDispatch= async ()=>{
    await firebaseAuth().signOut()
    // localstorage will change
    setAuth({
      token: undefined,
      isAuth: false,
      time: new Date(),
      loading: false,
      loginError: '',
      signupError: ''
    })
    history.push('/login')
  }
   



  return(
    <div>
        <Header handleSignout={signoutDispatch} isAuth={auth.isAuth}/>
        <Switch>
          <PrivateRoute path="/activities" component={Activities} isAuth={auth.isAuth} token={auth.token}/>
          <Route path='/login' render={props => <Login handleLogin={loginDispatch}  error={auth.loginError} loading={auth.loading}{...props} />} />
          <Route path='/signup' render={props => <Signup handleSignup={signupDispatch}  error={auth.signupError} loading={auth.loading} {...props} />} />
          <PrivateRoute path="/" component={Search} isAuth={auth.isAuth} token={auth.token}/>
        </Switch>

    </div>
  );
}

export default App