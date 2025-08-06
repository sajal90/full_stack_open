import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer.js";
import notificationReducer from "./reducers/notificationReducer.js";
import loginReducer from "./reducers/loginReducer.js";
import userReducer from "./reducers/userReducer.js";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer,
    login: loginReducer,
  },
});

export default store;
