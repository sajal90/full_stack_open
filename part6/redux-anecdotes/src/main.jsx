import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store.js";
import { initializeAnecdotes } from "./reducers/anecdoteReducer.js";

store.dispatch(initializeAnecdotes());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
