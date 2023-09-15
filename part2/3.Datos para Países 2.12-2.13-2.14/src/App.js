import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState('')

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const filteredCountries = countries.filter((country) => {
        if(newSearch.length > 0){
            return country.name.common.toLowerCase().includes(newSearch.toLowerCase())
        }

        return null;
    });

    const hook = () => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    return (
        <div>
            <Filter
                onChange={handleSearchChange}
            />
            <Countries
                filteredCountries={filteredCountries}
            />
        </div>
    )
}

export default App