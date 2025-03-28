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

const CountriesList = ({ countries }) => {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {countries.map((c) => <li key={c.name.common}>{c.name.common}</li>)}
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

  return (
    <div>
      <p>
        find country <input value={search} onChange={handleChange} />
      </p>
      <CountriesList countries={countriesToShow} />
    </div>
  );
};

export default App;
