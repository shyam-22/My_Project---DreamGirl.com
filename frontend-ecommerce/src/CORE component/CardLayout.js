import React from 'react'
import {Link} from "react-router-dom"
import ShowImage from "./showImage"

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
                    <p>{product.description.substring(0,50)}</p>
                    <p>${product.price}</p>
                    </center>
                    {showViewButton(showViewProductButton)}
                    <button type="submit" className="btn btn-outline-warning  mt-2 mb-2 ml-2">Add_To_Cart</button>

                </div>
            </div>
        </div>
    )
}

export default CardLayout
