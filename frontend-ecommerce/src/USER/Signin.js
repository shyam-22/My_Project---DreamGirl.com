import React, { useState } from 'react'
import Layout from "../CORE component/Layout"
import {Redirect} from "react-router-dom"
import {authenticate, isAuthenticated, signin} from "../Auth/api_signUp"

const Signin = () => {

    const [value,setValue] = useState({email : "mami@gmail.com", password :"mami@123", error : "", loading:false,redirectToReferrer:false})

    const {email,password,error,loading,redirectToReferrer} = value
    const {user} = isAuthenticated()

    const handleChange = name => (e) => {
        setValue({...value,error:false,[name]:e.target.value})
    }

    
//We can't send javascript Object to backend.....We need to send JSON ---> so we used JSON.stringify() method
//We will create 2 methods ---> error() , success()
    const handleSubmit = (e) => {
        e.preventDefault()
        setValue({...value,error:false, loading:true})
        
        signin({email,password})
        .then(data => {
            if(data.error){
                setValue({...value,error:data.error, loading:false})//here we grab d rest of d value using [...]
            }
            else{
                authenticate(data, () => {
                    setValue({...value, redirectToReferrer:true})//here no need to blank the all field...bcoz we redirect to page
                })
            }
        })
    }
    
    const signInForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-mutes">Email</label>
                <input type="email" className="form-control" value={email}
                onChange={handleChange("email")}/>
            </div>

            <div className="form-group">
                <label className="text-mutes">Password</label>
                <input type="password" className="form-control" value={password}
                onChange={handleChange("password")}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display : error ? "" : "none"}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-info"><h2>Loading....</h2></div>)
    )

    const redirectToUser = () => {
        if(redirectToReferrer){
            if(user && user.role === 1 ){
                return <Redirect to="/admin/dashboard"></Redirect>
            }
            else{
                return <Redirect to="/user/dashboard"></Redirect>
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/"></Redirect>
        }
    }

    return (
        <Layout title="SignUp Page" description="Node React ECommerce Signin page" 
        className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectToUser()}
        </Layout>
    );
};

export default Signin;