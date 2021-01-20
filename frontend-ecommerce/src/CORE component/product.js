//Java script linkEdin assesment github link -->https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/master/javascript/javascript-quiz.md 

import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {read,listRelated} from "./apiCore"
import CardLayout from "./CardLayout"

const Product = (props) => {
    const  [product ,setProduct] = useState({})
    const  [error ,setError] = useState(false)
    const  [relatedProduct ,setRelatedProduct] = useState([])

    
    //first we fetch single product......then we fetch related product
    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setProduct(data)
                //Now we fetch list related product
                listRelated(productId).then(data => {
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect( () => {
        const productId = props.match.params.productId
        loadSingleProduct(productId);
    },[props])

    return (
        <Layout title={product && product.name} 
                description={product && product.description} 
                className="container-fluid">

               <div className="row">
                  <div className="col-7">
                    {
                        product && product.description && (
                        <CardLayout product = {product} showViewProductButton={false}/>
                    )}
                  </div>

                  <div className="col-5 mb-2">
                  <h4><center>Related Product</center></h4>
                    {
                    relatedProduct.map((p,i) => (
                            <div>
                             <CardLayout key={i} product={p} />
                            </div>
                        ))
                    }
                  </div>
                   
                </div> 

        </Layout>
    )
}

export default Product
