import React,{useState} from "react"
import { Link } from "react-router-dom"
import {isAuthenticated} from "../Auth/api_signUp"
import Layout from "../CORE component/Layout"
import { createCategory } from "./apiAdmin"


const AddCategory = () => {
    const  [name ,setName] = useState("")
    const  [error ,setError] = useState(false)
    const  [success ,setSuccess] = useState(false)

    // destructor user and token from local storage
    const {user,token} = isAuthenticated()

    const handleChange = (e) => {
        setError("")
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError()
        setSuccess(false)
        //Now we will make request to create category
        createCategory(user._id,token,{name})
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError("")
                setSuccess(true)
            }
        })
    }

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">{name} category is created</h3>
        }
    }

    const showError = () => {
        if(error){
            return <h3 className="text-danger">category Name should be unique</h3>
        }
    }

    const goBack = () => (
        <div className="mt-2">
            <Link to="/admin/dashboard" className="text-success"><b><u>Back To dashboard</u></b></Link>
        </div>
    )

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text"  className="form-control" placeholder="Enter category Name"
                onChange={handleChange} value={name} autoFocus required/>

                <button type="submit" class="btn btn-outline-primary mt-2">Create category</button>
            </div>
        </form>
    )

    return (
        <Layout title="Add a new Category " description={`Have a good day ${user.name}.....,ready to add new category!!! `}>
            <div className="row">
                <div className="col-8 offset-2">
                    {showSuccess()} 
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}      
                </div>
            </div>
            
        </Layout>
      )
}

export default AddCategory
