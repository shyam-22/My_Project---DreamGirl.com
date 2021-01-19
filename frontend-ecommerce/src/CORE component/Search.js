import React,{useState,useEffect} from 'react'
import {getCategories} from "./apiCore"
import CardLayout from "./CardLayout"

const Search = () => {
    const [data,setData] = useState({
        categories : [],// we will make api request to get all category...bcoz we want to see list of the category in dropdown
        category : "", //when user picks a particular category.....thant we want to store here 
        search : "" , //what value we get in the search box
        results : [], //when user will submit....we will get all the product....we will stored all the products here
        searched : false
    })

    const {categories,category,search,searched,results} = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data, categories:data})
            }       
        })
    }

    useEffect( () => {
        loadCategories()
    },[]) 

    const searchSubmit = () => {
        //
    }

    const handleChange = () => {
        //
    }

    const searchForm = () => (
        //we will use span tag ...to make everything in inline(one line)
        //Prepend class --->this will prepend.....before the input search
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">

                        <select className="btn mr-2" onChange={handleChange("category")}>
                            <option value="ALl">Pick Any category</option>
                            {categories.map( (c,i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <input type="search" className="form-control" placeholder="Search any book u want..."
                    onChange={handleChange("search")}/>

                </div>

                <div className="btn input-group-append" style={{border:"none"}}>
                <button type="button" class="btn btn-success">Search</button>
                </div>   

            </span>
             
        </form>
    )

    return (
        <div className="row">
            <div className="container">{searchForm()}</div>
        </div>
    )
}

export default Search



