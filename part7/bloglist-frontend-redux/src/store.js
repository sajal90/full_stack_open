import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import loginReducer from "./reducers/loginReducer.js";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
  },
});

export default store;
