import {API} from "../config"
import queryString from "query-string"
export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
        method:"GET"
    })
    .then(response => response.json() )
    .catch(err => console.log(err))
} 

export const getCategories = () => {
    return fetch(`${API}/all/categories`,
    {
        method:"GET"
    })
    .then(response => { return response.json()})
    .catch(err => { return console.log(err) })  
}  

export const getFilterProducts = (skip,limit,filters = {}) => {
    const data = {skip,limit,filters}
    return fetch(`${API}/products/by/search`,
            {
                method : "POST",
                headers : {
                    Accept : "application/json", 
                    "content-Type":"application/json",
            },
                body : JSON.stringify(data)
            })
            .then(response => { return response.json() })
            .catch(err => { console.log(err)})
        }

        export const list = (params) => {
            const query = queryString.stringify(params)
            console.log("query",query)
            return fetch(`${API}/products?${query}`,
            {
                method:"GET"
            })
            .then(response => response.json() )
            .catch(err => console.log(err))
        } 
