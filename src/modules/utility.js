import React, { useEffect, useState } from "react";

export const useCompare = (val) => {
    const prevVal = usePrevious(val)
    if(typeof val === "boolean"){
        return val;
    }
    return prevVal !== val
}

const usePrevious = (value) =>{
    const ref = React.useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const useObjectState = (defaultValue)=>{
    const [obj, setObj] = useState(defaultValue || {});
    const handleValueChange = (value)=>{
        setObj(obj => ({
            ...obj, 
            ...value
        }));
    }
    return[
        obj,
        handleValueChange       
    ]
}

export const useFormInput = () => {
    const [inputs, setInputs] = useState({});
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name || event.target.id]: event.target.value}));
    }

    return {
      handleInputChange,
      inputs
    };
}