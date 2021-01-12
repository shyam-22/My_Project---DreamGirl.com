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

    const {name,description,price,categories,category,shipping,
    quantity,loading ,error,createdProduct,redirectToProfile,formData } = values

    const handleChange = name => e => {
        const value = name === "photo" ? e.target.files[0] : e.target.value 
        formData.set(name,value)
        setValues({...values,[name] : value})
    }

    useEffect( () => {
        setValues({ ...values, formData:new FormData() });
    },[]);

    const clickSubmit = (e) => {
        //
    }
    
    const goBack = () => (
        <div className="mt-2">
            <Link to="/admin/dashboard" className="text-success"><b><u>Back To dashboard</u></b></Link>
        </div>
    )

    const newProductForm = () => {
        return(
            <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
            //And this slightly looks better...so we going to keep this
                <label className="btn btn-secondary"> 
                    <input type="file" name="photo" accept="image/*" onChange={handleChange("photo")} />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" name="name" value={name}
                onChange={handleChange("name")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="textarea" className="form-control" name="description" value={description}
                onChange={handleChange("description")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" name="price" value={price}
                onChange={handleChange("price")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange("category")}  className="form-control">
                <option value="5fec766b65833b1e7c896ba7">Vue Js</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" name="quantity" value={quantity}
                onChange={handleChange("quantity")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange("shipping")}  className="form-control">
                <option value="0">No</option>
                <option value="1">Yes</option>
                </select>
            </div>

            <button type="submit" class="btn btn-outline-primary">Create Product</button>
        </form>
        )
    }

    return (
        <Layout title="Add a new Product " description={`Have a good day ${user.name}.....,ready to add new Product!!! `}>
        <div className="row">
            <div className="col-8 offset-2">
               {newProductForm()}
               {goBack()}
            </div>
        </div>
        
    </Layout>
    )
}

export default AddProduct