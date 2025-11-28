import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUsers,
  searchChats,
  type UpdatedUserInformation,
  type userType,
} from "../../api/users";
import { getChat } from "../../api/chats";
import { addChat, type ChatType } from "./chatsSlice";
import type { AppDispatch, RootState } from "..";
import { useSelector } from "react-redux";

export type fetchUsersSliceType = {
  updatedUser: UpdatedUserInformation | null;
  chat: ChatType | null;
  isLoading: boolean;
  isError: string | null;
  users: userType[];
  user: userType | null;
  onlineUsers: string[];
  chats: userType[];
  typingUsers: string[];
  activeUserId: string;
};

export const fetchUsers = createAsyncThunk<userType[] | void>(
  "users/fetchUsers",
  async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      window.location.href = "/loginPage";
    }
  }
);

export const fetchSearchResults = createAsyncThunk(
  "users/fetchSearchResults",
  async (q: string) => {
    try {
      const chats = await searchChats(q);
      return chats.chats;
    } catch (e) {
      throw e;
    }
  }
);

export const getChatThunk = createAsyncThunk<
  ChatType,
  { Id: string; userId: string },
  { state: RootState; dispatch: AppDispatch }
>("users/getChatThunk", async ({ Id, userId }, { getState, dispatch }) => {
  try {
    const state = getState();
    const chatCache = state.chats.chatCache;
    const response = await getChat(Id, userId);
    const chat = response.data;
    const currentChat = chatCache.find((c) => c._id === chat._id);
    if (!currentChat) {
      dispatch(addChat(chat));
    }
    return chat;
  } catch (error) {
    throw error;
  }
});

const initialState: fetchUsersSliceType = {
  activeUserId: "",
  updatedUser: null,
  chat: null,
  isError: null,
  users: [],
  isLoading: false,
  user: null,
  onlineUsers: [],
  chats: [],
  typingUsers: [],
};

const fetchUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: (state, { payload: userId }) => {
      state.activeUserId = userId;
    },
    setTypingUser: (state, { payload: userId }) => {
      state.typingUsers = [...state.typingUsers, userId];
    },
    setStopTypingUser: (state, { payload: userId }) => {
      state.typingUsers = state.typingUsers.filter((u) => u !== userId);
    },
    getOnlineUsers: (state, { payload: users }) => {
      state.onlineUsers = users;
    },
    getDisconnectUser: (state, { payload: userId }) => {
      state.onlineUsers = state.onlineUsers.filter((id) => id !== userId);
    },
    getOnlineUser: (state, { payload: userId }) => {
      if (!state.onlineUsers.includes(userId)) {
        state.onlineUsers.push(userId);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getChatThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getChatThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chat = action.payload;
      state.isError = null;
    });
    builder.addCase(getChatThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload || [];
      state.isError = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
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

export const currentUser = () =>
  useSelector((state: RootState) => state.users.activeUserId);

export const { actions, reducer } = fetchUsersSlice;
