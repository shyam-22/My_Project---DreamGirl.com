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

    const handleChange = (e) => {
        setError("")
        setName(e.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setError()
        setSuccess(false)
        //Now we will make request to create category
    }

    const newCategoryForm = () => {
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text"  className="form-control" placeholder="Enter category Name" autoFocus
                       onChange={handleChange} value={name}
                />

                <button type="button" class="btn btn-primary">Create category</button>
            </div>
        </form>
    }
    return (
        <Layout title="Add a new Category " description={`Have a good day ${name}.....,ready to add new category!!! `}>
            <div className="row">
                <div className="col-8">
                    {newCategoryForm()}       
                </div>
            </div>
            
        </Layout>
      )
}

export default AddCategory
