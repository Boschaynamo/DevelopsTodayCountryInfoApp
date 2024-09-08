import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
const API_URL = import.meta.env.VITE_API_URL;

const CountryContainer = ({ country, handleClick }) => {
  const [countryInfo, setCountryInfo] = useState(null);
  useEffect(() => {
    console.log("hellos");

    fetch(`${API_URL}/${country.countryCode}`)
      .then((response) => response.json())
      .then((data) => setCountryInfo(data));
    return () => {
      setCountryInfo(null);
    };
  }, [country]);

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleClick} className="self-end mr-10 mt-10 border px-2">
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
      </div >
      {countryInfo ? (
        <div className="w-2/3 border p-4 my-4">
        <Line
          data={{
            labels: countryInfo.countryPopulation.map((data) => data.year),
            datasets: [
              {
                label: "Population by year",
                data: countryInfo.countryPopulation.map((data) => data.value),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
        </div>
      ) : null}
    </div>
  );
};

export default CountryContainer;
