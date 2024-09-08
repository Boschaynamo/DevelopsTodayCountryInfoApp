import { useEffect, useState } from "react";

const CountriesContainer = ({ countries, handleClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-12 gap-4 mx-10 mt-3">
      {countries.map((country) => {
        return <button className="p-2 border rounded-lg border-cyan-800 h-20" key={country.name} value={country.name} onClick={handleClick}>{country.name}</button>;
      })}
    </div>
  );
};

export default CountriesContainer;
