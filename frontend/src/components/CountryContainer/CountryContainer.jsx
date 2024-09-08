import { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
const API_URL = import.meta.env.VITE_API_URL;

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color="#000"

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
      <div className="w-2/3">
      <button
        onClick={handleClick}
        className="self-start border px-2 py-1 mt-4 rounded-md border-red-700 hover:bg-indigo-600"
      >
        Back
      </button>
      </div>
      <div className="flex flex-col md:flex-row my-4 border border-cyan-800 rounded-2xl w-2/3 min-h-44">
        <div className="my-2 md:w-1/3 md:border-r md:border-cyan-800 flex justify-center items-center text-4xl ">
          {country.name}
        </div>
        <div className="my-2 md:w-2/3 flex justify-center items-center">
          {countryInfo ? (
            <img
              className="h-44 border border-zinc-800"
              src={countryInfo.flag}
              alt="Flag Image"
            />
          ) : (
            "Loading"
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4">
      <div className="flex flex-wrap my-4 w-2/3 lg:flex-row gap-2 md:gap-4 justify-center items-center">
        <h2 className="text-2xl text-nowrap">Border countries:</h2>
        
          {countryInfo?.borders.map((borderCountry) => (
            <button className="bg-slate-500 text-white rounded-md w-full md:w-auto px-4 py-1"
              value={borderCountry.country}
              key={borderCountry.country}
              onClick={handleClick}
            >
              {borderCountry.country}
            </button>
          ))}
        </div>
      </div>
      {countryInfo ? (
        <div className="w-2/3 border border-cyan-800 p-4 my-4">
          <Line
            className="h-96"
            data={{
              labels: countryInfo.countryPopulation.map((data) => data.year),
              datasets: [
                {
                  label: "Population by year",
                  data: countryInfo.countryPopulation.map((data) => data.value),
                  fill: false,
                  borderColor: "rgb(0, 0, 0)",
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
