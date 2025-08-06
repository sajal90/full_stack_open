import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store.js";
import { BrowserRouter } from "react-router-dom";
import { initializeBlogs } from "./reducers/blogReducer.js";
import { initializeUsers } from "./reducers/userReducer.js";

store.dispatch(initializeBlogs());
store.dispatch(initializeUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
