import React, { useState } from 'react'
import Layout from "../CORE component/Layout"
import {API} from "../config"


const Signup = () => {

    const [value,setValue] = useState({name : "", email : "", password :"", error : "", success:""})

    const {name,email,password} = value

    const handleChange = name => (e) => {
        setValue({...value,error:false,[name]:e.target.value})
    }

    const signUp = (name,email,password) => {
        console.log(name,email,password)
        fetch(`${API}/signup`,{
            method : "POST",
            headers : {Accept : "application/json", "content-Type":"application/json"},
            body : JSON.stringify(name,email,password)
        })
        .then(response => { return response.json() })
        .catch(err => { console.log(err)})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp({name,email,password})
    }
    
    const signUpForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-mutes">Name</label>
                <input type="text" className="form-control" onChange={handleChange("name")}/>
            </div>

            <div className="form-group">
                <label className="text-mutes">Email</label>
                <input type="email" className="form-control" onChange={handleChange("email")}/>
            </div>

            <div className="form-group">
                <label className="text-mutes">Password</label>
                <input type="Password" className="form-control" onChange={handleChange("password")}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )

    return (
        <Layout title="SignUp Page" description="Node React ECommerce Signup page" 
        className="container col-md-8 offset-md-2">
            {signUpForm()}
            {JSON.stringify(value)}
        </Layout>
    );
};

export default Signup;