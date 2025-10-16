import { createSlice } from "@reduxjs/toolkit";
import type { MessageType } from "../../components/Message/Message";

type forwardMessageSliceType = {
  forwardMessage: MessageType | null;
};

export const initialState: forwardMessageSliceType = {
  forwardMessage: null,
};

const forwardMessageSlice = createSlice({
  name: "forwardMessage",
  initialState,
  reducers: {
    setForwardMessage: (state, { payload: forwardMessage }) => {
      state.forwardMessage = forwardMessage;
    },
    clearForwardMessage: (state) => {
      state.forwardMessage = null;
    },
  },
});
export const { actions, reducer } = forwardMessageSlice;
