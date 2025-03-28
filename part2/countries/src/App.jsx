import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ country, weather }) => {
  if (weather == null) {
    return <div></div>;
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
      </div>
      <h1>Languages</h1>
      {Object.values(country.languages).map((l) => (
        <li key={l} style={{ listStyle: "inside", paddingLeft: 25 }}>{l}</li>
      ))}
      <img style={{ height: 300 }} src={country.flags["svg"]} />
      <h1>Weather in {country.name.common}</h1>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${
          weather.weather[0].icon
        }@2x.png`}
      />
      <p>Wind {weather.wind.speed}</p>
    </div>
  );
};

const CountryElement = ({ country, showElement }) => {
  return (
    <div>
      <li>
        {country.name.common}
        <button type="button" onClick={() => showElement(country)}>
          show
        </button>
      </li>
    </div>
  );
};

const CountriesList = ({ countries, showElement, weather }) => {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} weather={weather} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {countries.map((c) => (
        <CountryElement
          key={c.name.common}
          country={c}
          showElement={showElement}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      const country = countriesToShow[0];
      const latlon = country.latlng;
      const apiKey = import.meta.env.VITE_OPENWEATHER_API;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            latlon[0]
          }&lon=${latlon[1]}&appid=${apiKey}`,
        )
        .then((res) => {
          setWeather(res.data);
        });
    }
  }, [countriesToShow]);

  const handleChange = (event) => {
    setCountriesToShow(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value)
      ),
    );

    setSearch(event.target.value);
  };

  const showElement = (country) => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`,
      )
      .then((res) => {
        setCountriesToShow([res.data]);
      });
  };

  return (
    <div>
      <p>
        find country <input value={search} onChange={handleChange} />
      </p>
      <CountriesList
        countries={countriesToShow}
        showElement={showElement}
        weather={weather}
      />
    </div>
  );
};

export default App;
