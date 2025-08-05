import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      const likedBlog = action.payload;
      const newState = state.map((s) => s.id === likedBlog.id ? likedBlog : s);
      return [...newState].sort((a, b) => b.likes - a.likes);
    },
    delBlog(state, action) {
      const blogToDel = action.payload;
      const newState = state.filter((s) => s.id !== blogToDel.id);
      return newState;
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const updateLike = (blog) => {
  return async (dispatch) => {
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    const likedBlog = await blogService.update(
      changedBlog.id,
      changedBlog,
    );
    dispatch(likeBlog(likedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(delBlog(blog));
  };
};

export const { appendBlog, setBlogs, likeBlog, delBlog } = blogSlice.actions;
export default blogSlice.reducer;
