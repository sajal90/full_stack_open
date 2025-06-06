import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnec(state, action) {
      state.push(action.payload);
    },
    voteAnec(state, action) {
      const votedAnec = action.payload;
      const newState = state.map((s) => s.id === votedAnec.id ? votedAnec : s);
      return [...newState].sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecs));
  };
};

export const createAnec = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.create(content);
    dispatch(appendAnec(newAnec));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const votedAnec = await anecdoteService.update(
      anecdote.id,
      changedAnecdote,
    );
    dispatch(voteAnec(votedAnec));
  };
};

export const { appendAnec, voteAnec, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
