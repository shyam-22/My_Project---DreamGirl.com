import React, { Fragment } from 'react'
import {Link,withRouter} from "react-router-dom"
import {signout, isAuthenticated} from "../Auth/api_signUp"

//Active Class-----> history = Browser/actual_path that will be history, path = we will pass manually
const isActive = (history,path) => {
    if(history.location.pathname === path){
        return {color : "red"}
    }
    else{
        return {color : "white"}
    }
}

const Menu = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary"> 
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,"/")} to="/home">Home</Link>
                </li>

                {
                    isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,"/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                    </li>
                    )
                }

                {
                    isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,"/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                    </li>
                    )
                }

                { !isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history,"/signin")} to="/signin">SignIn</Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.history,"/signup")} to="/signup">SignUp</Link>
                        </li>
                    </Fragment>
                    
                )}

                { isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                    <span 
                        className="nav-link" style={{cursor:"pointer",color:"black"}} 
                        onClick={()=>
                        signout(() => {
                            props.history.push("/")
                            })
                    }>SignOut
                    </span>
                </li>
                    </Fragment>
                )}

               

                {/* <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li> */}
            </ul>
        </div>
    )
}

export default withRouter(Menu)


//Reason why and what......Normally <a> tag we used in HTML like so--->

//Link --->we are going to use <Link> tag because we don't want to reload the page based on every time we click

//WithRouter --->we are going to use withRouter because we need to access the props history