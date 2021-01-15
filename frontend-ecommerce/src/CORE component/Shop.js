import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getCategories} from "./apiCore"
import CardLayout from "./CardLayout"
import CheckBox_category from "./checkBox_category"

const Shop = () => {
    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(error)
            }else{
                setCategories(data)
            }
        })
    }

    const handleFilter = (filters,filterBy) => {
        console.log("shop",filters,filterBy)
    }

    useEffect(() => {
        init()
    },[])

    return (
        <Layout title="Shopping page" description="search and find books of your choice....!" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h2>Category Filter</h2>
                    <ul>
                    <CheckBox_category categories={categories} handleFilter={filters => handleFilter(filters,"category")}/>    
                    </ul>
                </div>

                <div className="col-8">
                    right-sidebar
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
