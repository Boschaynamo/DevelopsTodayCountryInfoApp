require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;

const API_ENDPOINT = process.env.URL_ALL_COUNTRIES;

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  //All countries
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((response) => res.json(response));
});

app.get("/:countryCode", async (req, res) => {
  //Specific country
  try {
    const { countryCode } = req.params;
    const response = await fetch(
      `${process.env.URL_COUNTRY_INFO}/${countryCode}`
    );
    const countryInfo = await response.json();
    const countryName = countryInfo.commonName;

    //borders
    const borders = countryInfo.borders.map((border) => {
      return { country: border.commonName };
    });

    //population
    const responsePopulationFetch = await fetch(
      process.env.URL_POPULATION_DATA
    );
    const allPopulation = await responsePopulationFetch.json();
    const countryPopulation = allPopulation.data.find(
      (eachCountry) => eachCountry.country === countryName
    );

    //flag
    const responseFlagFetch = await fetch(process.env.URL_FLAG_URL);
    const allFlags = await responseFlagFetch.json();
    const countryFlag = allFlags.data.find(
      (country) => country.name === countryName
    );

    //Response json
    res.status(200).json({
      borders,
      countryPopulation: countryPopulation.populationCounts,
      flag: countryFlag.flag,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
