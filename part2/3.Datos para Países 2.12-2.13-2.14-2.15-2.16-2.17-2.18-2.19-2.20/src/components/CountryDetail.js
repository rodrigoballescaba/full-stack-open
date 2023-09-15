import React, { useState, useEffect } from 'react'
import axios from 'axios'

function renderLanguages(languages) {
    return (
        <ul>
            {Object.values(languages).map((language, index) => (
                <li key={index}>{language}</li>
            ))}
        </ul>
    );
}

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState(null)

    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`)
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(hook, [country])

    return <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        {renderLanguages(country.languages)}
        <img height="100px" width="150px" src={country.flags.svg} alt={country.flags.alt} />
        <h2>Weather in {country.name.common}</h2>
        {weather !== null && <h3>temperature: {weather.temperature} ºC</h3>}
        {weather !== null && <img height="50px" width="50px" src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />}
        {weather !== null && <h3>wind: {weather.wind_speed} mph direction {weather.wind_dir}</h3>}
    </>
};

export default CountryDetail;




