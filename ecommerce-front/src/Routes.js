import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
//BrowserRouter already is a component-->so this will wrap the rest of routes i application
//BrowserRouter is main wrapper tha t will make the props available in all this components
import Signup from "./USER/Signup"
import Signin from "./USER/Signin"
import Home from "./CORE component/Home"
import Menu from "./CORE component/Menu"

const Routes = () => {
    return (
        <BrowserRouter>
        <Menu/>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                {/* <Route path="/" component={}/> */}
            </Switch>
        </BrowserRouter>
    )
}
//Route components is returning the entire application--->All components available here 
//So what we need to do is---> instead of using app in index.js...we will rendered route.js 
export default Routes;
