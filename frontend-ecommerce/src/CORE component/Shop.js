import React,{useState,useEffect} from 'react'
import Layout from "./Layout"
import {getCategories} from "./apiCore"
import CheckBox_category from "./checkBox_category"
import Radiobtn_Price from "./Radiobtn_Price"
import {prices} from "./FixPrice" 

const Shop = () => {
    const [myFilters, setMyFilters] = useState({ 
        filters : { category : [], price : [] }
    })
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
    //currently we are console log the category--->but we want to store in the state...so that we can use to make API req 
    const handleFilter = (filters,filterBy) => {
        //console.log("shop",filters,filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy === "price"){
            let priceValue = handlePrice(filters)
            newFilters.filters[filterBy] = priceValue
        }
        loadFilterResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array
    }

    const loadFilterResults = (newFilters) => {
        console.log(newFilters)
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

                    <h2>Price Filter</h2>
                    <ul>
                    <Radiobtn_Price prices={prices} handleFilter={filters => handleFilter(filters,"price")}/>    
                    </ul>
                </div>

                <div className="col-8">
                    {JSON.stringify(myFilters)}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;
