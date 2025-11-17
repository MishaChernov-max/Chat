import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getChatsInitialData,
  getUser,
  getUsers,
  searchChats,
  type userType,
} from "../../api/users";
import { getChat } from "../../api/chats";
import { addChat, type ChatType } from "./chatsSlice";
import type { AppDispatch, RootState } from "..";

export type ChatOverview = {
  roomId: string;
  userId: string;
  unreadCount: number;
  senderId: string;
};

export type fetchUsersSliceType = {
  chatLoading: boolean;
  chatError: string | null;
  chat: ChatType | null;
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
  typingUsers: string[];
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
  chatLoading: false,
  chatError: null,
  chat: null,
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
  typingUsers: [],
};

const fetchUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // updateChatCacheByGroupId: (state, { payload }) => {
    //   const cache = state.chatCache;
    //   const group = cache.byGroupId[payload.index];
    //   if (!group) {
    //     state.chatCache.byGroupId[payload.index] = payload.group;
    //   } else {
    //     state.chatCache.byGroupId[payload.index].messages = [
    //       ...(payload.messages || []),
    //     ];
    //   }
    // },
    // updateChatCache: (state, { payload }) => {
    //   switch (payload.action) {
    //     case "ADD_MESSAGE":
    //       const userId = state.chatCache.byRoomId[payload.index];
    //       if (!userId || !state.chatCache.byUserId[userId]) {
    //         return;
    //       }
    //       state.chatCache.byUserId[userId].chat.messages = payload.messages;
    //       break;
    //     case "UPDATE_UNREAD_COUNT":
    //       const uId = state.chatCache.byRoomId[payload.index];
    //       if (!uId || !state.chatCache.byUserId[uId]) {
    //         return;
    //       }
    //       state.chatCache.byUserId[uId].chat.unreadCount = payload.unreadCount;
    //       break;
    //     case "CLEAR_NOTIFICATIONS":
    //       const chat = state.chatCache.byUserId[payload.index];
    //       if (chat) {
    //         state.chatCache.byUserId[payload.index].chat.unreadCount = 0;
    //         fetch("http://localhost:5000/api/mark-as-read", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             roomId: chat.chat.roomId,
    //             userId: payload.currentId,
    //           }),
    //         }).then((res) => {
    //           if (!res.ok) {
    //             throw new Error(`Error status: ${res.status}`);
    //           } else {
    //             console.log("Получил успешный ответ");
    //           }
    //         });
    //         console.log("payload.currentId", payload.currentId);
    //       }
    //       break;
    //   }
    // },
    // updateChatCacheByUserId: (state, { payload }) => {
    //   const chat = state.chatCache.byUserId[payload.index];
    //   if (!chat) {
    //     state.chatCache.byUserId[payload.index] = {
    //       ...payload.chat,
    //       unreadCount: 0,
    //     };
    //     state.chatCache.byRoomId[payload.chat.roomId] = payload.index;
    //   }
    // },
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
      state.chatLoading = true;
      state.chatError = null;
    });
    builder.addCase(getChatThunk.fulfilled, (state, action) => {
      state.chatLoading = false;
      state.chat = action.payload;
      state.chatError = null;
    });
    builder.addCase(getChatThunk.rejected, (state, action) => {
      state.chatLoading = false;
      state.chatError = action.error.message ?? null;
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
  },
});

export const { actions, reducer } = fetchUsersSlice;
