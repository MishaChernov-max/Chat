import { Request, Response } from "express";
import { Server } from "socket.io";
import messageService from "../service/message-service";
import {
  ChatType,
  editMessageType,
  messagePayloadType,
  MessageType,
} from "../types";
import groupModel from "../models/group-model";
import userModels from "../models/user-models";
import userChatCounterModel from "../models/user-chat-counter-model";
import chatModel from "../models/chat-model";
import chatService from "../service/chat-service";
import { IMessage, IMessageResponse } from "../messages/interfaces";
import { Schema, Types } from "mongoose";
import { IUser } from "../users/interfaces";
import { IChatResponse } from "../chats/interfaces";

interface ForwardedMessage {
  roomId: { currentId: string; userId: string };
  forwardMessage: MessageType;
}

class MessageController {
  async deleteMessage(messageId: string) {
    return await messageService.deleteMessage(messageId);
  }

  async editMessage(messageId: string, text: string) {
    return await messageService.editMessage(messageId, text);
  }

  async createMessageRest(req: Request, res: Response) {
    const { chatId, senderId, text } = req.body.messagePayload;
    // return await messageService.createMessage(chatId, senderId, text);
    const chat = await messageService.createMessage(chatId, senderId, text);
    res.json(chat);
  }

  async createMessage(messagePayload: IMessage) {
    const { chat, sender, text } = messagePayload;
    const message = await messageService.createMessage(chat, sender, text);
    console.log("message", message);
    return message;
  }
  async getMessages(req: Request, res: Response) {
    const { lastId, limit, chatId } = req.params;
    const messages = await messageService.getMessages(
      lastId,
      parseInt(limit),
      chatId
    );
    res.json(messages);
  }

  // async getHistory(req: Request, res: Response) {
  //   if (req.body.type === "direct") {
  //     const { Id, userId } = req.body;
  //     const roomId = [Id, userId].sort().join("_");
  //     const chat = await messageService.getHistory(roomId);
  //     res.json({ userId: userId, chat: chat });
  //   } else if (req.body.type === "group") {
  //     const { Id } = req.body;
  //     const chat = await messageService.getHistory(Id);
  //     res.json(chat);
  //   }
  // }
  // async deleMessage(
  //   io: Server,
  //   roomId: string,
  //   messageId: string,
  //   type: ChatType
  // ) {
  //   const response = await messageService.deleMessage(roomId, messageId);
  //   if (type === "chat") {
  //     const participiants = roomId.split("_");
  //     participiants.forEach((userId) =>
  //       io?.to(userId).emit("new-message", response)
  //     );
  //   } else {
  //     const group = await groupModel.findOne({ _id: roomId });
  //     if (group) {
  //       group.participiants.forEach((u) =>
  //         io?.to(u._id.toString()).emit("new-message-group", response)
  //       );
  //     }
  //   }
  // }
  // async forwardMessage(io: Server, id: string, message: ForwardedMessage) {
  //   const { roomId, forwardMessage } = message;
  //   const chat = await messageService.forwardMessage(
  //     id,
  //     roomId,
  //     forwardMessage
  //   );
  //   const participiants = chat.roomId.split("_");
  //   participiants.forEach((userId) => io?.to(userId).emit("new-message", chat));
  // }
  // async editMessage(io: Server, message: editMessageType) {
  //   const type = message.updatedMessage.type;
  //   const chat = await messageService.editMessage(message);
  //   if (type === "chat") {
  //     const participiants = message.roomId.split("_");
  //     participiants.forEach((userId) =>
  //       io?.to(userId).emit("new-message", chat)
  //     );
  //   } else {
  //     const groupId = message.roomId;
  //     const group = await groupModel.findOne({ _id: groupId });
  //     if (group) {
  //       group.participiants.forEach((u) =>
  //         io?.to(u._id.toString()).emit("new-message-group", chat)
  //       );
  //     }
  //   }
  // }
  // async getMessage(io: Server, messagePayload: messagePayloadType) {
  //   const chat = await messageService.getMessage(messagePayload);
  //   const participiants = messagePayload.roomId.split("_");
  //   const type = messagePayload.message.type;
  //   if (type === "chat") {
  //     participiants.forEach((userId) =>
  //       io?.to(userId).emit("new-message", chat)
  //     );
  //     const receivedId = participiants.find(
  //       (userId) => userId !== messagePayload.message.id
  //     );
  //     if (receivedId) {
  //       const { text, id } = messagePayload.message;
  //       const user = await userModels.findOne({ _id: id });
  //       const data = {
  //         roomId: messagePayload.roomId,
  //         text: text,
  //         from: `${user?.firstName} ${user?.surName}`,
  //       };
  //       io?.to(receivedId).emit("notification", data);
  //       //Для группы
  //       // await userChatCounterModel.updateMany(
  //       //   {
  //       //     userId: { $in: receivedId },
  //       //     roomId: messagePayload.roomId,
  //       //   },
  //       //   { $inc: { unread_count: 1 } },
  //       //   { upsert: true }
  //       // );
  //       const counter = await userChatCounterModel.findOneAndUpdate(
  //         {
  //           userId: receivedId,
  //           roomId: messagePayload.roomId,
  //           senderId: messagePayload.message.id,
  //         },
  //         { $inc: { unreadCount: 1 } },
  //         { upsert: true, new: true }
  //       );
  //       console.log("counter", counter);
  //       io?.to(receivedId).emit("unread_update", {
  //         roomId: counter.roomId,
  //         unread_count: counter.unreadCount,
  //       });
  //     }
  //   } else {
  //     const groupId = messagePayload.roomId;
  //     const group = await groupModel.findOne({ _id: groupId });
  //     if (group) {
  //       group.participiants.forEach((u) =>
  //         io?.to(u._id.toString()).emit("new-message-group", chat)
  //       );
  //     }
  //   }
  // }
  // async handleFileMessage(io: Server, req: Request) {
  //   console.log("body", req.body);
  //   const chat = await messageService.getFileMessage({
  //     file: req.body.file,
  //     roomId: req.body.roomId,
  //     id: req.body.id,
  //     text: req.body.text,
  //     messageId: req.body.messageId,
  //   });
  //   const participiants = chat?.roomId.split("_");
  //   participiants?.forEach((userId) =>
  //     io?.to(userId).emit("new-message", chat)
  //   );
  // }
}
export default new MessageController();
