import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter !== "") {
      return state.anecdotes.filter((a) => a.content.includes(state.filter));
    } else {
      return state.anecdotes;
    }
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 5));
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
