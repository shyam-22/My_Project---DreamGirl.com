import React,{useState,useEffect,Fragment} from 'react'

const Radiobtn_Price = ({prices,handleFilter}) => {
    
    const [value, setValue] = useState(0)

    const handleRadio = event => {
        handleFilter(event.target.value);
        setValue(event.target.value)
    }

    return prices.map( (p,index) => (
        <div key={index}>
            <input type="radio" className="form-check-input" 
            onChange={handleRadio} name={p} value={`${p._id}`}/>
            <label className="mr-2 ml-2">{p.name}</label>
        </div>
    ))
}

export default Radiobtn_Price
