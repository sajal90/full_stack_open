import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import anecdoteService from "./services/anecdotes.js";
import { setAnecdotes } from "./reducers/anecdoteReducer.js";
import store from "./store.js";

anecdoteService.getAll().then((anecs) => {
  store.dispatch(setAnecdotes(anecs));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
