import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, type userType } from "../../api/users";

export type fetchUsersSliceType = {
  isLoading: boolean;
  isError: string | null;
  users: userType[];
};

export const fetchUsers = createAsyncThunk<userType[]>(
  "users/fetchUsers",
  async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: fetchUsersSliceType = {
  isLoading: false,
  isError: null,
  users: [],
};

const fetchUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.isError = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
  },
});

export const { actions, reducer } = fetchUsersSlice;
