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

//Authenticate User----> By getting its email/password related Token
//Save it into the Local storage---->Local storage is just a property of the Browser(Key : value)_
export const authenticate = (data,next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const signout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API}/signout`, {
            method:"GET",
        })
        .then(response => { console.log("signout", response)})
        .catch(err => console.log(err))

    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false 
    }
}
















