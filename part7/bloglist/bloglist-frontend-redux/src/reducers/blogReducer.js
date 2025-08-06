import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs.js";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const newState = state.map((s) =>
        s.id === updatedBlog.id ? updatedBlog : s
      );
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
    dispatch(updateBlog(likedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(delBlog(blog));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch(updateBlog(updatedBlog));
  };
};

export const { appendBlog, setBlogs, updateBlog, delBlog } = blogSlice.actions;
export default blogSlice.reducer;
