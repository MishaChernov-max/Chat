import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, type userType } from "../../api/users";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_id: string) => {
    try {
      console.log("id", _id);
      const user = await getUser(_id);
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export type fetchUserSliceType = {
  isLoading: boolean;
  isError: string | null;
  user: userType | null;
};

const initialState: fetchUserSliceType = {
  isLoading: false,
  isError: null,
  user: null,
};

const fetchUserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
  },
});
export const { actions, reducer } = fetchUserSlice;
