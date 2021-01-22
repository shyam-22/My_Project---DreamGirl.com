import React,{useState,useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"
import ShowImage from "./showImage"
import moment from "moment"
import {addItem,updateItem,removeItem} from "./Cart_Related"

const CardLayout = ({product,showViewProductButton = true,showAddToCartButton=true,
    showCartUpdateButton=false , showRemoveButton=false }) => {
    const [redirect,setRedirect] = useState(false)
    const [count,setCount] = useState(product.count)

        const showViewButton = (showViewProductButton) => {
            return showViewProductButton &&  (
                    <Link to={`/product/${product._id}` }>
                    <button type="button" className="btn btn-outline-primary mt-2 mb-2">View Product</button>
                     </Link>
                )
        }  

        const addToCart = () => {
            addItem(product, () => {
                setRedirect(true)
            })
        } 
        
        const shouldRedirect = redirect => {
            if(redirect){
                return <Redirect to="/cart"/>
            }
        }

        const showAddToCart = (showAddToCartButton) => {
            return showAddToCartButton && (
                <button type="submit" className="btn btn-outline-warning  mt-2 mb-2 ml-2" 
                    onClick={addToCart}
                >Add_To_Cart
                </button>
            )
        }
        const handleChange = productId => e => {
            setCount(e.target.value < 1 ? 1 : e.target.value)
            if(e.target.value >= 1){
                updateItem(productId, e.target.value)
            }
        }

        const showCartUpdate = (showCartUpdateButton) => {
            return showCartUpdateButton && (
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Quantity Adjust</span>
                    </div>
                    <input type="number" className="form-control" 
                           value={count} onChange={handleChange(product._id)} />
                </div>
            )
        }
        const showCartRemove = (showRemoveButton) => {
            return showRemoveButton && (
                <button type="submit" className="btn btn-outline-danger  mt-2 mb-2 ml-2" 
                    onClick={() => removeItem(product._id)}
                >Remove Product
                </button>
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
                    {showCartUpdate(showCartUpdateButton)}
                    {showCartRemove(showRemoveButton)}

                    {showAddToCart(showAddToCartButton)}
                    
                    </center>
                  
                   
                </div>
            </div>
        </div>
    )
}

export default CardLayout
