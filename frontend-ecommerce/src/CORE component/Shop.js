import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getProducts} from "./apiCore"
import CardLayout from "./CardLayout"

const Shop = () => {
    return (
        <Layout title="Shopping page" description="Node React ECommerce Home page" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    Left-sidebar
                </div>

                <div className="col-8">
                    right-sidebar
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
