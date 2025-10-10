import { createSlice } from "@reduxjs/toolkit";
import type { MessageType } from "../components/Message/Message";

export type messageSliceType = {
  roomId: string;
  messages: MessageType[];
};

export const initialState: messageSliceType = { roomId: "", messages: [] };

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
  },
});
export const { actions, reducer } = messageSlice;
