import React,{useState} from 'react'
import {Link, Redirect} from "react-router-dom"
import ShowImage from "./showImage"
import moment from "moment"
import {addItem} from "./Cart_Related"

const CardLayout = ({product,showViewProductButton = true}) => {
    const [redirect,setRedirect] = useState(false)

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
        const addTocart = () => {
            addItem(product, () => {
                setRedirect(true)
            })
        } 
        
        const shouldRedirect = redirect => {
            if(redirect){
                return <Redirect to="/cart"/>
            }
        }

        const showAddToCardButton = () => {
            return (
                <button type="submit" className="btn btn-outline-warning  mt-2 mb-2 ml-2" 
                    onClick={addTocart}
                >Add_To_Cart</button>
            )
        }

        const showStock = (quantity) => {
            return (
                quantity > 0 
                ? <center><span className="badge badge-primary badge-pill">In Stock</span></center> 
                : <center><span className="badge badge-warning badge-pill">Out of Stock</span></center>
            )
        }
    
    return (
        <div className="col-4 mb-2">
            <div className="card">
                <div className="card-header text-center name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <center><ShowImage product={product} url={"product"}/>
                    <p className="lead mt-2">{product.description.substring(0,50)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">Category : {product.category && product.category.name}</p>
                    <p className="black-8">Added On : {moment(product.createdAt).fromNow()}</p>


                    </center>
                    {showStock(product.quantity)}
                    <br/>
                    <center>
                      {showViewButton(showViewProductButton)}
                    {showAddToCardButton()}
                    </center>
                  
                   
                </div>
            </div>
        </div>
    )
}

export default CardLayout
