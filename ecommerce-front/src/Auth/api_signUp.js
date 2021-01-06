import {API} from "../config"

//SignUp
export const signup = (user) => {
    return fetch(`${API}/signup`,
            {
            method : "POST",
            headers : {Accept : "application/json", "content-Type":"application/json"},
            body : JSON.stringify(user)
            })
            .then(response => { return response.json() })
            .catch(err => { console.log(err)})
        }

//SignIn
export const signin = (user) => {
    return fetch(`${API}/signin`,
            {
            method : "POST",
            headers : {Accept : "application/json", "content-Type":"application/json"},
            body : JSON.stringify(user)
            })
            .then(response => { return response.json() })
            .catch(err => { console.log(err)})
        }
