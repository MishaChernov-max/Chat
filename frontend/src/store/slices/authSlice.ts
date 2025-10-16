import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit/react";
import {
  registerUser,
  updateUserProfile,
  type registerUserType,
  type updateUserType,
  type userType,
} from "../../api/users";
import { setLocalStorage } from "../../libs/localStorageApi";

export type updateUserTypeResponse = {
  name: string | null;
  surName: string | null;
  registrationCompleted: boolean;
};

export type authSliceType = {
  isConnected: boolean;
  user: userType | null;
  isLoading: boolean;
  isError: string | null;
};

export type registerUserResponseType = {
  accessToken: string | null;
  refreshToken: string | null;
  user: userType | null;
};

export const registerUserr = createAsyncThunk<
  registerUserResponseType,
  registerUserType
>("auth/registerUser", async (userdata) => {
  try {
    const response = await registerUser(userdata);
    setLocalStorage("accesToken", response.accessToken);
    return response;
  } catch (error) {
    throw error;
  }
});

export const setUserName = createAsyncThunk<
  updateUserTypeResponse,
  updateUserType
>("auth/registerUser", async (userdata) => {
  try {
    const response = await updateUserProfile(userdata);
    return response;
  } catch (error) {
    throw error;
  }
});

const initialState: authSliceType = {
  user: null,
  isLoading: false,
  isError: null,
  isConnected: false,
};

const authSlice = createSlice({
  name: "auth",
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
  extraReducers(builder) {
    builder.addCase(registerUserr.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(registerUserr.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = null;
      state.user = action.payload.user;
    });
    builder.addCase(registerUserr.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
  },
});
export const { actions, reducer } = authSlice;
