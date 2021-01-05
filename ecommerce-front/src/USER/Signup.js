import React from 'react'
import Layout from "../CORE component/Layout"


const Signup = () => {
    return (
        <Layout title="Signup page" description="Node React ECommerce Signup page">
            {process.env.REACT_APP_API_URL}
        </Layout>
    )
}

export default Signup