import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];
const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    getOnlineUsers: (state, { payload: users }) => {
      return users;
    },
    getDisconnectUser: (state, { payload: userId }) => {
      return state.filter((id) => id !== userId);
    },
    getOnlineUser: (state, { payload: userId }) => {
      if (!state.includes(userId)) {
        state.push(userId);
      }
    },
  },
});
export const { actions, reducer } = onlineUsersSlice;
