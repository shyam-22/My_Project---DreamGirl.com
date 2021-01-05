import React from 'react'
import {Link,withRouter} from "react-router-dom"
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

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,"/signin")} to="/signin">Signin</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,"/signup")} to="/signup">Signup</Link>
                </li>

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