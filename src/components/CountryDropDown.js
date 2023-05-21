import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDropdown = ({value, onChange}) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // Fetch country data from the API
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    onChange(selectedCountry); // Notify the parent component of the selected country
  };

  return (
    <select value={selectedCountry} onChange={handleCountryChange}>
      <option value="">Select a country</option>
      {countries.map(country => (
        <option key={country.name.common} value={country.name.common}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
