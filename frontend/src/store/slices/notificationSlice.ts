import { createSlice } from "@reduxjs/toolkit";

export type notificationUserType = {
  userId: string;
  quantity: number;
};
export type notificationSliceType = {
  users: notificationUserType[];
};
const initialState: notificationSliceType = {
  users: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addtNotification: (state, { payload: id }) => {
      const notification = state.users.find((u) => u.userId === id);
      if (notification) {
        notification.quantity += 1;
      } else {
        const user = { userId: id, quantity: 1 };
        state.users.push(user);
      }
    },
  },
});
export const { actions, reducer } = notificationSlice;
