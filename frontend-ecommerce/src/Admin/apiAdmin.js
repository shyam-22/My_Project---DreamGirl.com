import {API} from "../config"

//SignUp
export const createCategory = (userId,token,category) => {
    return fetch(`${API}/create/category/${userId}`,
            {
            method : "POST",
            headers : {
                Accept : "application/json", 
                "content-Type":"application/json",
                Authorization : `Bearer ${token}`
            },
            body : JSON.stringify(category)
            })
            .then(response => { return response.json() })
            .catch(err => { console.log(err)})
        }