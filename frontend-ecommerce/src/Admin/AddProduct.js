import React,{useState,useEffect} from "react"
import { Link } from "react-router-dom"
import {isAuthenticated} from "../Auth/api_signUp"
import Layout from "../CORE component/Layout"
import { createProduct,getCategories} from "./apiAdmin"

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

    //Load all categories in the dropdown box,,,and set form data
    const init = () => {
        getCategories().then(data => {
            if(error){
                setValues({ ...values, error:data.error})
            }else{
                setValues({ ...values, categories: data, formData : new FormData() })
            }
        })
    }

    useEffect( () => {
        init();
    },[]);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name] : value})
    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error:"",loading:true})
        createProduct(user._id,token,formData)
        .then(data => {
            if(error){
                setValues({ ...values,error:data.error, loading:true})
            }else{
                setValues({...values,name:"",description:"",photo:"",price:"",shipping:"",category:"",
                            quantity:"",loading:false, createdProduct:data.name});
            }
        })
    }
    const newProductForm = () => {
        return(
            <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary"> 
                    <input type="file" accept="image/*" onChange={handleChange("photo")} />
                </label>
            </div>

            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control"  value={name}
                onChange={handleChange("name")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <input type="textarea" className="form-control"  value={description}
                onChange={handleChange("description")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" value={price}
                onChange={handleChange("price")} />
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control"  value={quantity}
                onChange={handleChange("quantity")} />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select onChange={handleChange("category")}  className="form-control">
                <option>Please select Categories</option>
                {categories && categories.map((c, i) => (
                    <option key={i} value={c._id}>{c.name}</option>
                ))}
                </select>
            </div>

        
            <div className="form-group">
                <label>Shipping</label>
                <select onChange={handleChange("shipping")}  className="form-control">
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
                </select>
            </div>

            <button type="submit" class="btn btn-outline-primary">Create Product</button>
        </form>
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error  ? "All Fields Are Required" : "none"}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct  ? "" : "none"}}>
            <h2>{`${createdProduct}`} is Created...!</h2>
        </div>
    )

    const showLoading = () => (
        loading  && (
        <div className="alert alert-success">
            <h2>Loading....</h2>
        </div>)
    )

    const goBack = () => (
        <div className="mt-2">
            <Link to="/admin/dashboard" className="text-success"><b><u>Back To dashboard</u></b></Link>
        </div>
    )
    
    return (
        <Layout title="Add a new Product " description={`Have a good day ${user.name}.....,ready to add new Product!!! `}>
        <div className="row">
            <div className="col-8 offset-2">
                {showError()}
               {showSuccess()}
               {showLoading()}
               {newProductForm()}
               {goBack()}
            </div>
        </div>
        
    </Layout>
    )
}

export default AddProduct;