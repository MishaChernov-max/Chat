import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { MessageType } from "../../components/Message/Message";
import type { RootState } from "..";
import { useSelector } from "react-redux";
import { getChatMessages, type ParamsRequest } from "../../api/messages";

export type MessagesCacheType = {
  messages: MessageType[];
  updateAt: Date;
};

export type messageSliceType = {
  roomId: string;
  messages: MessageType[];
  isLoading: boolean;
  isError: string | null;
  forwardMessage: MessageType | null;
  messagesCache: Record<string, MessagesCacheType>;
};

export const initialState: messageSliceType = {
  roomId: "",
  messages: [],
  isLoading: false,
  isError: null,
  forwardMessage: null,
  messagesCache: {},
};

export const getChatMessagesByIdThunk = createAsyncThunk(
  "messageSlice/getChatMessagesByIdThunk",
  async (chatId: string) => {
    try {
      //Запрос за всеами сообщениями по chatId
      //Сохранение в кэш и замена свойства messages у стейта для того чтобы подписчик показал соообщения чата
      const response = await getChatMessages({
        lastId: "",
        limit: 10,
        chatId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    getMessagesCache: (state, { payload: roomId }) => {
      state.roomId = roomId;
      const chatMessages = state.messagesCache[roomId];
      state.messages = chatMessages.messages;
    },
    updateChatMessagesCache: (state, { payload: message }) => {
      const chatMessages = state.messagesCache[message.chat._id];
      if (chatMessages) {
        chatMessages.messages = [...chatMessages.messages, message];
        //Замена ссылки на массив для компонента который использует этот массив сообщений
        if (state.roomId === message.chat._id) {
          state.messages = chatMessages.messages;
        }
      }
    },
    getRoomId: (state, { payload: roomid }) => {
      state.roomId = roomid;
    },
    getMessages: (state, { payload: messages }) => {
      state.messages = messages;
    },
    setForwardMessage: (state, { payload: forwardMessage }) => {
      state.forwardMessage = forwardMessage;
    },
    clearForwardMessage: (state) => {
      state.forwardMessage = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getChatMessagesByIdThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getChatMessagesByIdThunk.fulfilled, (state, action) => {
      //Загрузка
      state.isLoading = false;
      //Получение сообщений
      state.messages = action.payload;

      //Обновляю кэш
      const chatId = action.meta.arg;
      //Обновляю RoomId
      state.roomId = chatId;
      state.messagesCache[chatId] = {
        messages: state.messages,
        updateAt: Date.now() as unknown as Date,
      };
      //Ошибка
      state.isError = null;
    });
    builder.addCase(getChatMessagesByIdThunk.rejected, (state, action) => {
      state.isLoading = true;
      state.isError = action.error.message ?? null;
    });
  },
});
export const { actions, reducer } = messageSlice;

export const useChatCache = () =>
  useSelector((state: RootState) => state.messageSlice.messagesCache);

export const useChatMessages = () =>
  useSelector((state: RootState) => state.messageSlice.messages);

export const useRoomId = () =>
  useSelector((state: RootState) => state.messageSlice.roomId);
