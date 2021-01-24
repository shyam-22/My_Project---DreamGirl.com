import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"

const Checkout = ({products}) => {
    return (
        <h2>{JSON.stringify(products)}</h2>
    )
}

export default Checkout
