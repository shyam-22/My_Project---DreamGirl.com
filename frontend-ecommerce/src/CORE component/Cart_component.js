import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"
import {getToCart} from "./Cart_Related"
import { Link } from 'react-router-dom'

const Cart_component = () => {
    const [items,setItems] = useState([])

    useEffect(() => {
       setItems(getToCart()) 
    },[])

    const showItemsList = items => {
        return (
            <div className="">
                <h2>Your Cart Has {`${items.length}`} Items</h2>
                <hr/>
                {
                    items.map( (product,i) => (
                        <CardLayout 
                        key={i} 
                        product={product} 
                        showAddToCartButton={false} 
                        showCartUpdateButton={true}
                        showRemoveButton={trur}
                        />
                    ))
                }
            </div>
        )
    }

    const noItemMessage =() => {
        <h2>Your cart is empty
        <br/>
        <Link to="/shop">Continue Shopping</Link>
        </h2>
    }

    return (
        <Layout title="Shopping Cart" description="manage Your Cart Items....Add/Remove/Checkout or Continue Shopping" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0  ? showItemsList(items) : noItemMessage()}
                </div>

                <div className="col-6">
                    <p>Show checkOut option/Shipping Address/total/update the quantity</p>
                </div>
            </div>
            
        </Layout>
    )
    

}

export default Cart_component
