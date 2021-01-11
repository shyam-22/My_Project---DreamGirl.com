import React,{Component} from "react"
import {Route,Redirect} from "react-router-dom" 
import {isAuthenticated} from "../Auth/api_signUp"


const AdminRoute = ( {component : Component, ...rest }) => {
    return (
       <Route
        {...rest} 
        render={props => isAuthenticated()  && isAuthenticated().user.role === 1 
        ? ( <Component {...props}/>) 
        : ( <Redirect to={{pathname : "/signin", state : {from : props.location}}}/>)}
       />
    )
}

export default AdminRoute

//Error :  Spread children are not supported in React.
