import React from 'react'
import {Link} from "react-router-dom"
import ShowImage from "./showImage"
import moment from "moment"

const CardLayout = ({product,showViewProductButton = true}) => {

        const showViewButton = (showViewProductButton) => {
            return (
                showViewProductButton && 
                (
                    <Link to={`/product/${product._id}` }>
                    <button type="button" className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                     </Link>
                )
            )
        }  

        const showAddToCardButton = () => {
            return (
                <button type="submit" className="btn btn-outline-warning  mt-2 mb-2 ml-2">Add_To_Cart</button>
            )
        }

        const showStock = (quantity) => {
            return (
                quantity > 0 
                ? <span className="badge badge-primary badge-pill badge-center">In Stock</span>
                : <span className="badge badge-warning badge-pill">Out of Stock</span>
            )
        }
    
    return (
        <div className="col-3 mb-2">
            <div className="card">
                <div className="card-header text-center name">{product.name}</div>
                <div className="card-body">
                    <center><ShowImage product={product} url={"product"}/>
                    <p className="lead mt-2">{product.description.substring(0,50)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category : {product.category && product.category.name}</p>
                    <p className="black-8">Added On : {moment(product.createdAt).fromNow()}</p>


                    </center>
                    {showStock(product.quantity)}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCardButton()}
                   
                </div>
            </div>
        </div>
    )
}

export default CardLayout
