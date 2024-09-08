import { useState, useEffect } from "react";
import CountriesContainer from "./components/CountriesContainer/CountriesContainer";
import CountryContainer from "./components/CountryContainer/CountryContainer";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  },[]);

  const handleClick = (event)=>{
    console.log(event.target.value);
    
    const countryNameClicked = event.target.value
    setSelectedCountry(countries.find(country => country.name ===countryNameClicked))
  }
  return (
    <div className="bg-gradient-to-r from-indigo-300 to-purple-200">
      
      {selectedCountry ? (
        <CountryContainer country={selectedCountry} handleClick={handleClick}/>
      ) : (<>
        <h1 className="flex justify-center py-10 text-4xl md:text-6xl">Country Info App</h1>
        <CountriesContainer countries={countries} handleClick={handleClick} />
        </>
      )}
    </div>
  );
}

export default App;
