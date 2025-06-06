import { useEffect } from "react";
import AnecdoteList from "./components/AnecdoteList.jsx";
import AnecdoteForm from "./components/AnecdoteForm.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
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
