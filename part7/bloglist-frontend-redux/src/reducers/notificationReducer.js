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

export const setNotification = (message, timeInSec) => {
  return (dispatch) => {
    dispatch(changeNoti(message));

    setTimeout(() => {
      dispatch(changeNoti(""));
    }, timeInSec * 1000);
  };
};

export const { changeNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
