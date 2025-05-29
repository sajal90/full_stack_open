import { useDispatch, useSelector } from "react-redux";
import { createAnec, voteAnec } from "./reducers/anecdoteReducer.js";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";

    dispatch(createAnec(content));
  };

  const vote = (id) => {
    dispatch(voteAnec(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
