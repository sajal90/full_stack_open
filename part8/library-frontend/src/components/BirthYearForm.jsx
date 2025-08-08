import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../queries.js";
import Select from "react-select";

const BirthYear = ({ authors }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);
  const options = authors.map((a) => ({ value: a.name, label: a.name }));

  const handleSumbit = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name: name.value, year: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSumbit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYear;
