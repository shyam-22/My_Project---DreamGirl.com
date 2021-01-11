import React from "react"
import Layout from "../CORE component/Layout"
import {isAuthenticated} from "../Auth/api_signUp"
import { Link } from "react-router-dom"

 //and here ..we can display tjhe user information such as [username,email,Role,]
//Later we might add user about,purchase history field....when we implement a user profile update
const AdminDashboard = () => {
    const {user : {_id,name,email,role}} = isAuthenticated()

    const AdminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? "Admin" : "Registered user"}</li>
                </ul>
            </div>
        )
    }

   

    const AdminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/profile/update">Create Products</Link>
                    </li>
                </ul>
            </div>
        )
    }
    return (
      <Layout title="Dashboard" description={`Have a good day ${name}.....!!! `} className="container-fluid">
          <div className="row">
              <div className="col-3">
                {AdminLinks()}
              </div>

              <div className="col-9">
                  {AdminInfo()}       
              </div>
          </div>
          
      </Layout>
    )
}

export default AdminDashboard
