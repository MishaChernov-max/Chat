import { ObjectId, SchemaType, Types } from "mongoose";
import chatModel from "../models/chat-model";
import messageModel from "../models/message-model";
import userModels from "../models/user-models";
import {
  editMessageType,
  messageFilePayloadType,
  messagePayloadType,
  MessageType,
} from "../types";
import { IUser } from "../users/interfaces";
import { IMessageResponse } from "../messages/interfaces";

class MessageService {
  USER_EXLUDED_FIELDS = "-activationCode -password";
  async getMessages(lastId: string, limit: number, chatId: string) {
    return messageModel
      .find({
        chatId: chatId,
        _id: {
          $lte: lastId,
        },
      })
      .sort({ _id: -1 })
      .limit(limit);
  }
  async deleteMessage(messageId: string) {
    return await messageModel.findOneAndDelete({
      _id: messageId,
    });
  }
  async editMessage(messageId: string, text: string) {
    return await messageModel.findOneAndUpdate(
      {
        _id: messageId,
      },
      {
        text: text,
        isEdited: true,
      },
      { new: true }
    );
  }
  async createMessage(
    chat: string,
    sender: string,
    text: string
  ): Promise<IMessageResponse> {
    const message = await messageModel.create({
      chat: new Types.ObjectId(chat),
      sender: new Types.ObjectId(sender),
      text: text,
    });

    const newMessage = await messageModel
      .findOne({ _id: message._id })
      .select({ type: 0 })
      .populate({ path: "sender", select: this.USER_EXLUDED_FIELDS })
      .populate("chat")
      .lean();

    console.log("chat", chat);

    await chatModel.findOneAndUpdate(
      { _id: chat },
      { $push: { messages: message._id } },
      { new: true, useFindAndModify: false }
    );
    return newMessage as unknown as IMessageResponse;
  }

  // async getHistory(roomId: string) {
  //   const chat = await chatModel.findOne({ roomId: roomId });
  //   if (!chat) {
  //     const newChat = await chatModel.create({
  //       roomId: roomId,
  //       messages: [],
  //     });
  //     return newChat;
  //   }
  //   return chat;
  // }
  // async deleMessage(roomId: string, messageId: string) {
  //   const chat = await chatModel.findOne({ roomId });
  //   if (chat) {
  //     const messageIndex = chat.messages.findIndex(
  //       (m) => m?.messageId === messageId
  //     );
  //     if (messageIndex > -1) {
  //       chat.messages.splice(messageIndex, 1);
  //     }
  //     await chat.save();
  //     const response = { roomId: chat.roomId, messages: chat.messages };
  //     return response;
  //   }
  // }
  // async forwardMessage(
  //   id: string,
  //   roomId: { currentId: string; userId: string },
  //   forwardMessage: MessageType
  // ) {
  //   const { currentId, userId } = roomId;
  //   const calculatedRoomId = [currentId, userId].sort().join("_");
  //   const chat = await this.getHistory(calculatedRoomId);
  //   const sender = await userModels.findOne({ _id: forwardMessage.id });
  //   forwardMessage.id = id;
  //   forwardMessage.forwardedFrom = sender?.firstName || "";
  //   chat.messages.push(forwardMessage);
  //   await chat.save();
  //   return chat;
  // }
  // async editMessage(message: editMessageType) {
  //   const { roomId, updatedMessage } = message;
  //   const { text, messageId } = updatedMessage;
  //   const chat = await chatModel.findOne({ roomId });
  //   if (chat) {
  //     const message = chat.messages.find((m) => m?.messageId === messageId);
  //     if (message) {
  //       message.text = text;
  //       message.isEdited = true;
  //       await chat.save();
  //       return chat;
  //     }
  //   }
  // }
  // async getMessage(messagePayload: messagePayloadType) {
  //   const { roomId, message } = messagePayload;
  //   const chat = await chatModel.findOne({ roomId: roomId });
  //   if (chat) {
  //     console.log("Проваливаюсь сюда");
  //     chat.messages.push(message);
  //     await chat.save();
  //     return chat;
  //   }
  //   console.log("chat", chat);
  // }
  // async getFileMessage(messagePayload: messageFilePayloadType) {
  //   const { file, roomId, id, text, messageId } = messagePayload;
  //   const chat = await chatModel.findOne({ roomId: roomId });

  //   if (chat) {
  //     const arrayBuffer = await file.arrayBuffer();
  //     const buffer = Buffer.from(arrayBuffer);
  //     const message = {
  //       id: messageId,
  //       text: text,
  //       messageId: messageId,
  //       senderId: id,
  //       timestamp: new Date(),
  //       attachment: {
  //         name: file.name,
  //         size: file.size,
  //         type: file.type,
  //         data: buffer,
  //         url: `/api/files/${messageId}`,
  //       },
  //     };

  //     chat.messages.push(message);
  //     await chat.save();
  //     return chat;
  //   }
  // }
}
export default new MessageService();
