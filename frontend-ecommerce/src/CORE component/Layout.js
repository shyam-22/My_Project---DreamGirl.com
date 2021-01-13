import React from "react"
import Menu from "./Menu"

import "../STYLE/style.css"

const Layout = ( {title = "Title",description ="description",children,className} ) =>  (

        <div>
            <Menu/>
            <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
            <div className={className}>
                {children}
            </div>
        </div>
    );

export default Layout;
