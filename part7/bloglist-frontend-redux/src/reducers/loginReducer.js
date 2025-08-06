import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import { setNotification } from "./notificationReducer.js";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    logIn: (state, action) => {
      return action.payload;
    },
    logOut: () => {
      return null;
    },
  },
});

export const setUser = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedInUser = await loginService.login(credentials);
      window.localStorage.setItem(
        "loggedBlogUser",
        JSON.stringify(loggedInUser),
      );
      blogService.setToken(loggedInUser.token);
      dispatch(logIn(loggedInUser));
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5));
    }
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogUser");
    blogService.setToken(null);
    dispatch(logOut());
  };
};

export const { logIn, logOut } = loginSlice.actions;

export default loginSlice.reducer;
