//Java script linkEdin assesment github link -->https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/master/javascript/javascript-quiz.md 

import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"

const Product = (props) => {
    const  [product ,setProduct] = useState({})
    const  [error ,setError] = useState(false)

    const loadSingleProduct = (productId) => {
        read().then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setProduct(data)
            }
        })
    }

    useEffect( () => {
        const productId = props.match.params.productId
        loadSingleProduct(productId);
    },[])

    return (
        <Layout title="Add To cart page" description="Node React ECommerce Home page" className="container-fluid">
               <h2 className="mb-2 mt-2">Single Product Fetch</h2>   
               <div className="row">
                    {JSON.stringify(product)}
                </div> 
        </Layout>
    )
}

export default Product
