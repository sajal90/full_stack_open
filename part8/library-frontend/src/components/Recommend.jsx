import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries.js";

const Recommend = ({ show }) => {
  const result = useQuery(ME);
  const resultBooks = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (result.loading || resultBooks.loading) {
    return <div>loading user info...</div>;
  }

  const userInfo = result.data.me;

  const books = resultBooks.data.allBooks;
  const filterBooks = books.filter((b) =>
    b.genres.includes(userInfo.favoriteGenre)
  );

  return (
    <div>
      <h1>Recommendations</h1>
      <p>
        Books in yout favorite genre <strong>patterns</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
