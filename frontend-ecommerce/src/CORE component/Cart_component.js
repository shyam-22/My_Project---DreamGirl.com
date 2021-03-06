import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import CardLayout from "./CardLayout"
import {getToCart} from "./Cart_Related"
import { Link } from 'react-router-dom'
import Checkout from "./checkout"


const Cart_component = () => {
    const [items,setItems] = useState([])

    useEffect(() => {
       setItems(getToCart()) 
    },[items])

    //whenever there is a any changes in items(state).... 

    const showItemsList = (items) => {
        return (
            <div className="">
                <h2>Your Cart Has {`${items.length}`} Items </h2>
                <hr/>
                {
                    items.map( (product,i) => (
                        <CardLayout 
                        key={i} 
                        product={product} 
                        showAddToCartButton={false} 
                        showRemoveButton={true}
                        showCartUpdateButton={true}
                        />
                    ))
                }
            </div>
        )
    }

    const noItemMessage =() => {
        return (
            <h2>Your cart is empty
            <br/>
            <Link to="/shop">Continue Shopping....</Link>
            </h2>
        )   
    }

    return (
        <Layout title="Shopping Cart" description="manage Your Cart Items....Add/Remove/Checkout or Continue Shopping" className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0  ? showItemsList(items) : noItemMessage()}
                </div>

                <div className="col-6">
                    <h2 className="mb-4">Your cart Summary</h2>
                    <hr/>
                    <Checkout products={items}/>
                </div>
            </div>
            
        </Layout>
    )
    

}

export default Cart_component;
