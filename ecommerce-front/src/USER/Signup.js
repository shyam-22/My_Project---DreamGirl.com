import React, { useState } from 'react'
import Layout from "../CORE component/Layout"
import {Link} from "react-router-dom"
import {signup,authenticate} from "../Auth/api_signUp"

const Signup = () => {

    const [value,setValue] = useState({name : "", email : "", password :"", error : "", success:""})

    const {name,email,password,error,success} = value

    const handleChange = name => (e) => {
        setValue({...value,error:false,[name]:e.target.value})
    }

    
//We can't send javascript Object to backend.....We need to send JSON ---> so we used JSON.stringify() method
//We will create 2 methods ---> error() , success()
    const handleSubmit = (e) => {
        e.preventDefault()
        setValue({...value,error:false})

        signup({name,email,password})
        .then(data => {
            if(data.error){
                setValue({...value,error:data.error, success:false})
            }
            else{
                setValue({...value, name:"", email:"", password:"", error: "", success:true})
            }
        })
    }
    
    const signUpForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-mutes">Name</label>
                <input type="text" className="form-control" value={name}
                onChange={handleChange("name")}/>
            </div>

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

    const showSuccess = () => (
        <div className="alert alert-info" style={{display : success ? "" : "none"}}>
            New account is created ....please <Link to="/signin">SignIn</Link> 
        </div>
    )

    return (
        <Layout title="SignUp Page" description="Node React ECommerce Signup page" 
        className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;