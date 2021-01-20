//Java script linkEdin assesment github link -->https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/master/javascript/javascript-quiz.md 

import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {read} from "./apiCore"
import CardLayout from "./CardLayout"

const Product = (props) => {
    const  [product ,setProduct] = useState({})
    const  [error ,setError] = useState(false)

    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
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
        <Layout title={product && product.name} 
                description={product && product.description} 
                className="container-fluid">

               <div className="row">
                   {
                   product && product.description && <CardLayout product = {product} showViewProductButton={false}/>
                   }
                   
                </div> 

        </Layout>
    )
}

export default Product
