import React from 'react'
import {API} from "../config"


const showImage = ({product,url}) => {
    return (
        <div className="product-image">
            <img src={`${API}/${url}/photo/${product._id}`} alt={product.name} className="mb-2 mh-100% mw-100%"/>
        </div>
    )
}

export default showImage
