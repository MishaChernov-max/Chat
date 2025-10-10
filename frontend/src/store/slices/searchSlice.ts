import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchChats, type userType } from "../../api/users";

export type searchSliceType = {
  chats: userType[];
  isLoading: boolean;
  isError: string | null;
};

export const initialState: searchSliceType = {
  chats: [],
  isLoading: false,
  isError: null,
};

export const fetchSearchResults = createAsyncThunk(
  "searchSlice/fetchSearchResults",
  async (q: string) => {
    try {
      const chats = await searchChats(q);
      return chats.chats;
    } catch (e) {
      throw e;
    }
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSearchResults.pending, (state) => {
      (state.isLoading = true), (state.isError = null);
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.chats = action.payload),
        (state.isError = null);
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      (state.isLoading = false), (state.isError = action.error.message ?? null);
    });
  },
});

export const { actions, reducer } = searchSlice;
