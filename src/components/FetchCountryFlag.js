const FetchCountryFlag = async (countryName) => {
    try {
      // Fetch all countries data
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countriesData = await response.json();
  
      // Find the matching country by name
      const country = countriesData.find(
        (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
      );
  
      if (country) {
        // Extract the alpha-2 country code
        const countryCode = country.cca2.toLowerCase();
  
        // Fetch the country flag using the alpha-2 country code from a flag API
        const flagResponse = await fetch(`https://flagcdn.com/32x24/${countryCode}.png`);
        const flagUrl = flagResponse.url;
  
        return flagUrl;
      } else {
        console.error('Country not found');
      }
    } catch (error) {
      console.error('Error fetching country flag:', error);
    }
  };
  
  export default FetchCountryFlag

  