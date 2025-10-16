import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as connectionReducer } from "./slices/connectionSlice";
import { reducer as MessagesReducer } from "./messagesSlice";
import { reducer as fetchUsersSlice } from "./slices/fetchUsersSlice";
import { reducer as fetchUserSlice } from "./slices/fetchUserSlice";
import { reducer as authSlice } from "./slices/authSlice";
import { reducer as onlineUsersSlice } from "./slices/onlineUsersSlice";
import { reducer as searchChatsSlice } from "./slices/searchSlice";
import { reducer as notificationSlice } from "./slices/notificationSlice";
import { reducer as ForwardMessagesSlice } from "./slices/forwardMessageSlice";

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const reducers = combineReducers({
  websocketConnection: connectionReducer,
  messageSlice: MessagesReducer,
  users: fetchUsersSlice,
  user: fetchUserSlice,
  auth: authSlice,
  onlineUsers: onlineUsersSlice,
  searchSlice: searchChatsSlice,
  notifications: notificationSlice,
  forwardMessage: ForwardMessagesSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
