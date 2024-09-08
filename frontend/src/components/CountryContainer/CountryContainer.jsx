import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const CountryContainer = ({ country, handleClick }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  useEffect(() => {
    console.log('hellos');
    
    fetch(`${API_URL}/${country.countryCode}`)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
    return () => {setCountryInfo(null)};
  }, [country]);

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleClick} className="self-end mr-10 mt-10">
        Back
      </button>
      {country.name}
      <div className="flex justify-center gap-4">
        {countryInfo?.borders.map((borderCountry) => (
          <button
            value={borderCountry.country}
            key={borderCountry.country}
            onClick={handleClick}
          >
            {borderCountry.country}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryContainer;
