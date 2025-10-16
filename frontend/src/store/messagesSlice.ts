import { createSlice } from "@reduxjs/toolkit";
import type { MessageType } from "../components/Message/Message";

export type messageSliceType = {
  roomId: string;
  messages: MessageType[];
  isLoading: boolean;
};

export const initialState: messageSliceType = {
  roomId: "",
  messages: [],
  isLoading: false,
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    getRoomId: (state, { payload: roomid }) => {
      state.roomId = roomid;
    },
    getMessages: (state, { payload: messages }) => {
      state.messages = messages;
    },
    markLoading: (state) => {
      state.isLoading = true;
    },
    undoLoading: (state) => {
      state.isLoading = false;
    },
  },
});
export const { actions, reducer } = messageSlice;
