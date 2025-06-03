import { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import anecdoteService from "./services/anecdotes.js";
import { setAnecdotes } from "./reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then((anecs) => {
      dispatch(setAnecdotes(anecs));
    });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
