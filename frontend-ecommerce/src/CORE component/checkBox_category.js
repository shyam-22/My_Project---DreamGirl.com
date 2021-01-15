import React from 'react'

const checkBox_category = ({categories}) => {
    return categories.map( (category,index) => (
        <li className="list-unstyled" key={index}>
            
            <input type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{category.name}</label>
        </li>
    ))
}

export default checkBox_category;
