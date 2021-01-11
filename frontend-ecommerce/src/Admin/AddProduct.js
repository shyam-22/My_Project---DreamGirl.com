import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {isAuthenticated} from "../Auth/api_signUp"
import Layout from "../CORE component/Layout"
import { createProduct} from "./apiAdmin"

const AddProduct = () => {
    const {user,token} = isAuthenticated()

    const [values,setValues] = useState({
        name : "",
        description :"",
        price : "",
        categories : [],
        category : "",
        shipping : "",
        quantity : "",
        photo : "",
        loading : "",
        error : false,
        createdProduct : "",
        redirectToProfile : false,
        formData : ""
    })

    const {name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading ,
    error,
    createdProduct,
    redirectToProfile,
    formData } = values

    const newProductForm = () => {
        return(
            <form className="mb-3">
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" name="photo" accept="image/*" />
                </label>
            </div>
        </form>
        )
    }

    return (
        <Layout title="Add a new Product " description={`Have a good day ${user.name}.....,ready to add new Product!!! `}>
        <div className="row">
            <div className="col-8 offset-2">
               {newProductForm()}
            </div>
        </div>
        
    </Layout>
    )
}

export default AddProduct