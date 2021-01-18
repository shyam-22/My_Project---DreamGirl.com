import React,{useState} from 'react'

const CheckBox_category = ({categories,handleFilter}) => {

    const [checked,setChecked] = useState([])

    const handleToggle = c => () =>  {
        //return first index [or] -1
        //indexOf() method will return the first index at which element can be found in the array
        const currentCategoryId = checked.indexOf(c)//If it not found in d index...it will return -1
        const newCheckedCategoryId = [...checked]
            //If currently checked was not already in checked state--->push
            //else pull/take off
        if(currentCategoryId === -1){
            //means this category not already in the  state.....so we will push new category
            newCheckedCategoryId.push(c)
        }else{
            //But if it already in the state---->means when user checked the category....we need to un-checked the category 
            newCheckedCategoryId.splice(currentCategoryId,1) //we are taking off/pull off...position,1 item pull of
        }
        console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilter(newCheckedCategoryId)
    }
    
    return categories.map( (c,index) => (
        <li className="list-styled" key={index}>
            <input type="checkbox" className="form-check-input" 
            onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)}/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default CheckBox_category;
