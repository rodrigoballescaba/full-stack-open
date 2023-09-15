const CountryName = ({ country, showCountryDetail}) => (
    <>
        <span>{country.name.common}</span>
        <button onClick={(event) => showCountryDetail(event, country)}>show</button>
        <br />
    </>
);

export default CountryName