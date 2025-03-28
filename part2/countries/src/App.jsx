import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
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
    </div>
  );
};

const CountryElement = ({ country, showElement }) => {
  return (
    <div>
      <li>
        {country.name.common}
        <button type="button" onClick={() => showElement(country.name.common)}>
          show
        </button>
      </li>
    </div>
  );
};

const CountriesList = ({ countries, showElement }) => {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
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

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  const handleChange = (event) => {
    setCountriesToShow(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value)
      ),
    );

    setSearch(event.target.value);
  };

  const showElement = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => {
        setCountriesToShow([res.data]);
      });
  };

  return (
    <div>
      <p>
        find country <input value={search} onChange={handleChange} />
      </p>
      <CountriesList countries={countriesToShow} showElement={showElement} />
    </div>
  );
};

export default App;
