import React,{useState,useEffect} from "react"
import {Route,Redirect} from "react-router-dom" 
import {isAuthenticated} from "../Auth/api_signUp"
import Layout from "../CORE component/Layout"


const AddCategory = () => {
    const  [name ,setName] = useState("")
    const  [error ,setError] = useState(false)
    const  [success ,setSuccess] = useState(false)

    // destructor user and token from local storage
    const [user,token] = isAuthenticated()

}
