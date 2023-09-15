import CountryDetail from "./CountryDetail";
import CountryName from "./CountryName";
import React, { useState } from "react";

const Countries = ({ filteredCountries }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const showCountryDetail = (event, country) => {
        event.preventDefault()
        setSelectedCountry(country);
        setShowDetail(true);
    }

    if (filteredCountries.length === 0) {
        return (<p>No results found</p>)
    }

    if (filteredCountries.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    }

    if (filteredCountries.length > 1) {
        return (
            <>
                {filteredCountries.map((country, index) => (
                    <CountryName key={index} country={country} showCountryDetail={showCountryDetail} />
                ))}
                {showDetail && <CountryDetail country={selectedCountry} />}
            </>
        );
    }

    return (
        <>
            <CountryDetail country={filteredCountries[0]} />
        </>
    );
}

export default Countries