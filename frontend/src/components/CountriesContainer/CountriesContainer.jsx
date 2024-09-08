import { useEffect, useState } from "react";

const CountriesContainer = ({ countries, handleClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mx-10 mt-3">
      {countries.map((country) => {
        return <button className="bg-blue-200" key={country.name} value={country.name} onClick={handleClick}>{country.name}</button>;
      })}
    </div>
  );
};

export default CountriesContainer;
