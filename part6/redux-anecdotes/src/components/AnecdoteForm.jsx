import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer.js";
import { changeNoti } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnec = (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";
    dispatch(createAnec(content));
    dispatch(changeNoti(content));

    setTimeout(() => {
      dispatch(changeNoti(""));
    }, 5000);
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
