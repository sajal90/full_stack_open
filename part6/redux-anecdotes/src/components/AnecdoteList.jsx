import { useDispatch, useSelector } from "react-redux";
import { voteAnec } from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      return state.anecdotes.filter((a) => a.content.includes(state.filter));
    } else {
      return state.anecdotes;
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnec(id));
  };

  return (
    <div>
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
    </div>
  );
};

export default AnecdoteList;
