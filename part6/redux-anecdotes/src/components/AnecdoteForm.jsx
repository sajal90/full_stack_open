import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(createAnec(content));
    dispatch(setNotification(`new anecdote ${content}`, 5));
  };

  return (
    <div>
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

export default AnecdoteForm;
