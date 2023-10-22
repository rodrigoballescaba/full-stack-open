import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    var hook = () => { }

    if(name){
        hook = () => {
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
                .then(response => {
                    setCountry(response.data)
                })
                .catch(_ => {
                    setCountry({ name: false })
                })
        }
    }
   
    useEffect(hook, [name])

    return country
}