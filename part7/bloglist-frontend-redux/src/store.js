import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
  },
});

export default store;
