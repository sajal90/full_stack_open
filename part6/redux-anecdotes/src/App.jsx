import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const createAnec = (event) => {
    event.preventDefault();
    const newAnec = {
      type: "NEW_ANEC",
      payload: {
        content: event.target.anec.value,
        votes: 0,
      },
    };

    dispatch(newAnec);
  };

  const vote = (id) => {
    const votedAnec = {
      type: "VOTE",
      payload: {
        id: id,
      },
    };
    dispatch(
      votedAnec,
    );
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
      <form onSubmit={createAnec}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;

