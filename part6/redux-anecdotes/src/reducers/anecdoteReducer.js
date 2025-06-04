import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnec(state, action) {
      state.push(action.payload);
    },
    voteAnec(state, action) {
      const id = action.payload;
      const votedAnec = state.find((a) => a.id === id);
      const changedAnec = { ...votedAnec, votes: votedAnec.votes + 1 };
      const newState = state.map((s) => s.id === id ? changedAnec : s);
      return [...newState].sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnec, voteAnec, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
