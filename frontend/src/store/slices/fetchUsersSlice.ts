import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getChat,
  getChatsInitialData,
  getUser,
  getUsers,
  searchChats,
  type ChatData,
  type userType,
} from "../../api/users";
import type { GroupData } from "./groupSlice";

export type ChatCacheType = {
  byUserId: { [key: string]: ChatData };
  byRoomId: { [key: string]: string };
  byGroupId: { [key: string]: GroupData };
};

export type ChatOverview = {
  roomId: string;
  userId: string;
  unreadCount: number;
  senderId: string;
};

export type fetchUsersSliceType = {
  isLoading: boolean;
  isError: string | null;
  users: userType[];
  isUserLoading: boolean;
  isUserError: string | null;
  user: userType | null;
  onlineUsers: string[];
  chats: userType[];
  isSearchLoading: boolean;
  isSearchError: string | null;
  chatCache: ChatCacheType;
  typingUsers: string[];
  isOverviewLoading: boolean;
  isOverviewError: string | null;
  chatsOverview: ChatOverview[];
};

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
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

export const fetchChatsOverview = createAsyncThunk(
  "users/fetchChatsOverview",
  async (userId: string) => {
    console.log("userId In fetchChatsOverview", `${userId} это userId`);
    const response = await getChatsInitialData(userId);
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk<userType[] | void>(
  "users/fetchUsers",
  async () => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      console.error(error);
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
  ChatData,
  { Id: string; userId: string; type: string }
>("users/getChatThunk", async ({ Id, userId, type }) => {
  const response = await getChat(Id, userId, type);
  return response.data;
});

const initialState: fetchUsersSliceType = {
  isUserLoading: false,
  isError: null,
  users: [],
  isLoading: false,
  isUserError: null,
  user: null,
  onlineUsers: [],
  chats: [],
  isSearchLoading: false,
  isSearchError: null,
  chatCache: { byRoomId: {}, byUserId: {}, byGroupId: {} },
  typingUsers: [],
  isOverviewLoading: false,
  isOverviewError: null,
  chatsOverview: [],
};

const fetchUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateChatCacheByGroupId: (state, { payload }) => {
      const cache = state.chatCache;
      const group = cache.byGroupId[payload.index];
      if (!group) {
        state.chatCache.byGroupId[payload.index] = payload.group;
      } else {
        state.chatCache.byGroupId[payload.index].messages = [
          ...(payload.messages || []),
        ];
      }
    },
    updateChatCache: (state, { payload }) => {
      switch (payload.action) {
        case "ADD_MESSAGE":
          const userId = state.chatCache.byRoomId[payload.index];
          if (!userId || !state.chatCache.byUserId[userId]) {
            return;
          }
          state.chatCache.byUserId[userId].chat.messages = payload.messages;
          break;
        case "UPDATE_UNREAD_COUNT":
          const uId = state.chatCache.byRoomId[payload.index];
          if (!uId || !state.chatCache.byUserId[uId]) {
            return;
          }
          state.chatCache.byUserId[uId].chat.unreadCount = payload.unreadCount;
          break;
        case "CLEAR_NOTIFICATIONS":
          const chat = state.chatCache.byUserId[payload.index];
          if (chat) {
            state.chatCache.byUserId[payload.index].chat.unreadCount = 0;
            fetch("http://localhost:5000/api/mark-as-read", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                roomId: chat.chat.roomId,
                userId: payload.currentId,
              }),
            }).then((res) => {
              if (!res.ok) {
                throw new Error(`Error status: ${res.status}`);
              } else {
                console.log("Получил успешный ответ");
              }
            });
            console.log("payload.currentId", payload.currentId);
          }
          break;
      }
    },
    updateChatCacheByUserId: (state, { payload }) => {
      const chat = state.chatCache.byUserId[payload.index];
      if (!chat) {
        state.chatCache.byUserId[payload.index] = {
          ...payload.chat,
          unreadCount: 0,
        };
        state.chatCache.byRoomId[payload.chat.roomId] = payload.index;
      }
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
    builder.addCase(fetchUser.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.user = action.payload;
      state.isUserError = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = action.error.message ?? null;
    });
    builder.addCase(fetchSearchResults.pending, (state) => {
      (state.isSearchLoading = true), (state.isSearchError = null);
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      (state.isSearchLoading = false),
        (state.chats = action.payload),
        (state.isSearchError = null);
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      (state.isSearchLoading = false),
        (state.isSearchError = action.error.message ?? null);
    });
    builder.addCase(getChatThunk.fulfilled, (state, action) => {
      const cache = state.chatCache;
      const { userId } = action.payload;
      const { roomId } = action.payload.chat;
      cache.byUserId[userId] = action.payload;
      cache.byRoomId[roomId] = userId;
    });
    builder.addCase(fetchChatsOverview.pending, (state) => {
      state.isOverviewLoading = true;
      state.isOverviewError = null;
    });
    builder.addCase(fetchChatsOverview.fulfilled, (state, action) => {
      state.isOverviewLoading = false;
      state.chatsOverview = action.payload;
    });
    builder.addCase(fetchChatsOverview.rejected, (state, action) => {
      state.isOverviewLoading = false;
      state.isOverviewError = action?.error.message ?? null;
    });
  },
});

export const { actions, reducer } = fetchUsersSlice;
