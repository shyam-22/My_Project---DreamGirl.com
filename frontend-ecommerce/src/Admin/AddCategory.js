import React,{useState} from "react"
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
                setError(data.error)
            }else{
                setError("")
                setSuccess(true)
            }
        })
    }

    const showSuccess = () => {
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }

    const showError = () => {
        if(error){
            return <h3 className="text-danger">{name} is should be unique</h3>
        }
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text"  className="form-control" placeholder="Enter category Name"
                onChange={handleChange} value={name}/>

                <button type="button" class="btn btn-outline-primary mt-2">Create category</button>
            </div>
        </form>
    )

    return (
        <Layout title="Add a new Category " description={`Have a good day ${user.name}.....,ready to add new category!!! `}>
            <div className="row">
                <div className="col-8 offset-2">
                    {newCategoryForm()}  
                    {showError()}
                    {showSuccess()}     
                </div>
            </div>
            
        </Layout>
      )
}

export default AddCategory
