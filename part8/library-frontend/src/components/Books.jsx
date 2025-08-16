import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries.js";
import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const result = useQuery(ALL_BOOKS);
  const resultFiltered = useQuery(ALL_BOOKS, { variables: { genre: filter } });

  if (!props.show) {
    return null;
  }
  if (result.loading || resultFiltered.loading) return <p>Loading...</p>;

  const books = result.data.allBooks;
  const booksFiltered = resultFiltered.data.allBooks;

  const getGenres = (books) => {
    const allGenres = books.flatMap((book) => book.genres);
    return [...new Set(allGenres)];
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFiltered.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {getGenres(books).map((genres) => (
          <button
            key={genres}
            onClick={() => setFilter(genres)}
          >
            {genres}
          </button>
        ))}
        <button onClick={() => setFilter("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
