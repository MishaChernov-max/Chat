import { createSlice } from "@reduxjs/toolkit";

type connectionSliceType = {
  isConnected: boolean;
};

const initialState: connectionSliceType = {
  isConnected: false,
};

const connectionSlice = createSlice({
  name: "websocketConnection",
  initialState,
  reducers: {
    setConnection: (state, { payload: conn }) => {
      if (conn) {
        state.isConnected = true;
      } else {
        state.isConnected = false;
      }
    },
  },
});
export const { actions, reducer } = connectionSlice;
