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
import { reducer as MessagesReducer } from "./slices/messagesSlice";
import { reducer as fetchUsersSlice } from "./slices/usersSlice";
import { reducer as authSlice } from "./slices/authSlice";
import { reducer as groupSlice } from "./slices/groupSlice";
import { reducer as chatSlice } from "./slices/chatsSlice";

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];

export const reducers = combineReducers({
  chats: chatSlice,
  messageSlice: MessagesReducer,
  users: fetchUsersSlice,
  auth: authSlice,
  group: groupSlice,
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
