import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    changeNoti(state, action) {
      return action.payload;
    },
  },
});

export const { changeNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
