import React from "react"
import Layout from "../CORE component/Layout"
import {isAuthenticated} from "../Auth/api_signUp"
import { Link } from "react-router-dom"

 //and here ..we can display tjhe user information such as [username,email,Role,]
//Later we might add user about,purchase history field....when we implement a user profile update
const userDashboard = () => {
    const {user : {_id,name,email,role}} = isAuthenticated()

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered user"}</li>
                </ul>
            </div>
        )
    }

    const userHistory = () => {
        return (
            <div className="card">
            <h3 className="card-header">Purchase History</h3>
            <li className="list-group-item">history</li>
        </div>
        )
    }

    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }
    return (
      <Layout title="Dashboard" description={`Have a good day ${name}.....!!! `} className="container-fluid">
          <div className="row">
              <div className="col-3">
                {userLinks()}
              </div>

              <div className="col-9">
                  {userInfo()}
                  {userHistory()}         
              </div>
          </div>
          
      </Layout>
    )
}

export default userDashboard
