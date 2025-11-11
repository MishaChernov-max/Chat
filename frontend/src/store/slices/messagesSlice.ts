import { createSlice } from "@reduxjs/toolkit";
import type { MessageType } from "../../components/Message/Message";

export type messageSliceType = {
  roomId: string;
  messages: MessageType[];
  isLoading: boolean;
  forwardMessage: MessageType | null;
};

export const initialState: messageSliceType = {
  roomId: "",
  messages: [],
  isLoading: false,
  forwardMessage: null,
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
    setForwardMessage: (state, { payload: forwardMessage }) => {
      state.forwardMessage = forwardMessage;
    },
    clearForwardMessage: (state) => {
      state.forwardMessage = null;
    },
  },
});
export const { actions, reducer } = messageSlice;

// export const useMessanger = ()=>useSelector(("Данные"));
