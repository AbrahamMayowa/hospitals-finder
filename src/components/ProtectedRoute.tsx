import React ,{FunctionComponent}from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link,
    NavLink,
    Redirect
  } from "react-router-dom";




const PrivateRoute = ({ component: Component, token, isAuth, ...rest }: any) => (
    //pass token and isAuth boolean to Search and Activitis screen
    <Route {...rest} render={(props) => (
       isAuth ? <Component {...props} token={token} isAuth={isAuth}/>
        : <Redirect to='/login' />
    )} />
  )
export default PrivateRoute