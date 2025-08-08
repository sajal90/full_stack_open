import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../queries.js";

const BirthYear = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const handleSumbit = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, year: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSumbit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
