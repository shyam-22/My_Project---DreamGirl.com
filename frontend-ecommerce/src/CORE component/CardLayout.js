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
    
    return (
        <div className="col-3 mb-2">
            <div className="card">
                <div className="card-header text-center">{product.name}</div>
                <div className="card-body">
                    <center><ShowImage product={product} url={"product"}/>
                    <p className="lead mt-2">{product.description.substring(0,50)}</p>
                    <p className="black-9">${product.price}</p>
                    <p className="black-8">Category : {product.category && product.category.name}</p>
                    <p className="black-9">Added On : {moment(product.createdAt).fromNow()}</p>


                    </center>
                    {showViewButton(showViewProductButton)}
                    <button type="submit" className="btn btn-outline-warning  mt-2 mb-2 ml-2">Add_To_Cart</button>

                </div>
            </div>
        </div>
    )
}

export default CardLayout
