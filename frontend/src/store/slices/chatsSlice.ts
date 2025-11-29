import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { userType } from "../../api/users";
import { getChatById, getChats } from "../../api/chats";
import useActions from "../../hooks/useActions";
import type { MessageType } from "../../components/Message/Message";
import { useSelector } from "react-redux";
import type { RootState } from "..";

export type ChatType = {
  _id: string;
  participants: userType[];
  createdAt: Date;
  updatedAt: Date;
  messages: MessageType[];
  name: string;
  avatar?: string;
};

export type chatsSliceType = {
  isLoading: boolean;
  isError: string | null;
  chats: ChatType[];
  chatCache: ChatType[];
  activeChat: ChatType | null;
};

const initialState: chatsSliceType = {
  isLoading: false,
  isError: null,
  chats: [],
  chatCache: [],
  activeChat: null,
};

export const loadUserChats = createAsyncThunk(
  "chats/loadUserChats",
  async (userId: string) => {
    console.log("Делаю запрос с таким userId", userId);
    const response = await getChats(userId);
    console.log("chats from api", response);
    return response.data;
  }
);

export const getChatByIdThunk = createAsyncThunk(
  "chats/getChatByIdThunk",
  async (id: string) => {
    try {
      const { addChat } = useActions();
      const response = await getChatById(id);
      addChat(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChat: (state, { payload: chat }) => {
      if (state.chats.length === 5) {
        state.chatCache = state.chatCache.slice(1);
      }
      state.chats = [...state.chats, chat];
      state.chatCache = [...state.chatCache, chat];
    },
    replaceChat: (state, { payload: chat }) => {
      state.activeChat = chat;
    },
    updateChatCache: (state, { payload: message }) => {
      console.log("новый message с сервера", message);
      const chat = state.chatCache.find((c) => c._id === message.chat._id);
      console.log("chat из new-message", chat);
      if (chat) {
        chat.messages.push(message);
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(loadUserChats.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(loadUserChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = action.payload;
      state.isError = null;
    });
    builder.addCase(loadUserChats.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
    builder.addCase(getChatByIdThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getChatByIdThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.activeChat = action.payload;
      state.isError = null;
    });
    builder.addCase(getChatByIdThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? null;
    });
  },
});

export const { actions, reducer } = chatSlice;

export const { addChat } = chatSlice.actions;

export const useChats = () =>
  useSelector((state: RootState) => state.chats.chats);
