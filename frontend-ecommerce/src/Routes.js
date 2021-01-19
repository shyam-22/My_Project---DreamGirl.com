import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
//BrowserRouter already is a component-->so this will wrap the rest of routes i application
//BrowserRouter is main wrapper tha t will make the props available in all this components
import Signup from "./USER/Signup";
import Signin from "./USER/Signin";
import Home from "./CORE component/Home";
import PrivateRoutes from './Auth/PrivateRoutes';
import userDashboard from './USER/userDashboard';
import AdminRoute from './Auth/AdminRoute';
import AdminDashboard from './USER/AdminDashboard';
import AddCategory from './Admin/AddCategory';
import AddProduct from './Admin/AddProduct';
import Shop from "./CORE component/Shop"
import Product from "./CORE component/Product"

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/shop" exact component={Shop}/>

                <Route path="/product/:productId" exact component={Product}/>


                //Dashboard only available to authenticated user....Here we want to create some kind of component
                <PrivateRoutes path="/user/dashboard" exact component={userDashboard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminRoute path="/create/category" exact component={AddCategory}/>
                <AdminRoute path="/create/product" exact component={AddProduct}/>


            </Switch>
        </BrowserRouter>
    )
}
//Route components is returning the entire application--->All components available here 
//So what we need to do is---> instead of using app in index.js...we will rendered route.js 
export default Routes;
