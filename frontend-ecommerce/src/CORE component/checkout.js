import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"
import {isAuthenticated} from "../Auth/api_signUp"
import { Link } from 'react-router-dom'

const Checkout = ({products}) => {

    //first argument is callback function--->current value,next value , second argument indicates the index
    const getTotal = () => {
        return products.reduce((currentValue , nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const showCheckOut = () => {
        return (
            isAuthenticated() 
                ? (<button type="button" className="btn btn-success">Checkout</button>) 
                : (<Link to="/signin">
                        <button type="button" className="btn btn-primary"> Sign In to checkout</button>
                   </Link>)
            
        )

    return (
        <div>
        <h2>Total : ${getTotal()}</h2>
            {showCheckOut()} 
        </div>
    )
}

export default Checkout

//Reduce () method work
// const array = [1,2,3,4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue

//1+2+3+4 => expected output = 10
// console.log(array1.reduce(reducer));
