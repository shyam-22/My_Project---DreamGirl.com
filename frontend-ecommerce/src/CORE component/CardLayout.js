import React from 'react'
import {Link} from "react-router-dom"
import ShowImage from "./showImage"

const CardLayout = ({product}) => {
    return (
        <div className="col-3 mb-2">
            <div className="card">
                <div className="card-header text-center">{product.name}</div>
                <div className="card-body">
                    <center><ShowImage product={product} url={"product"}/>
                    <p>{product.description.substring(0,50)}</p>
                    <p>${product.price}</p>
                    </center>
                    <Link to="/">
                    <button type="button" className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
                    </Link>
                    <button type="button" className="btn btn-outline-danger mt-2 mb-2">Add_To_Cart</button>

                </div>
            </div>
        </div>
    )
}

export default CardLayout
