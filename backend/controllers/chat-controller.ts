import { Request, Response } from "express";
import chatService from "../service/chat-service";
import { IUser } from "../users/interfaces";
import { ObjectId } from "mongoose";
import chatModel from "../models/chat-model";
import userModels from "../models/user-models";
import { IChatResponse } from "../chats/interfaces";
class ChatController {
  async getParticipants(chat: IChatResponse) {
    return await chatModel.findOne({ _id: chat._id }).populate("participants");
  }
  async getChat(req: Request, res: Response) {
    //currentUserId беру из payload
    //Временная заглушка req.body.currentUserId
    const chat = await chatService.getChat(
      req.body.currentUserId,
      req.body.friendUserId
    );
    console.log("chat", chat);
    if (!chat) {
      return res.sendStatus(404);
    }
    const friend = chat.participants.find(
      (p) => p._id.toString() === req.body.friendUserId
    ) as unknown as IUser;
    if (!friend) {
      return res.sendStatus(404);
    }
    chat.name = friend.firstName;
    chat.avatar = friend.avatar;
    console.log("chat", chat);
    res.json(chat);
  }
  async getAllChats(req: Request, res: Response) {
    const userId = req.params.userId;
    console.log("userId", userId);
    const response = await chatService.getAllChats(userId);
    response.map((chat) => {
      const interlocutor = chat.participants.find(
        (participant) => participant._id.toString() !== userId
      ) as unknown as IUser;
      chat.avatar = interlocutor?.avatar;
      chat.name = interlocutor?.firstName;
      return chat;
    });
    console.log("Send chats to user ", userId, response);
    res.json(response);
  }
  async getChatById(req: Request, res: Response) {
    const chat = await chatService.getChatById(req.params.id);
    if (!chat) {
      return res.sendStatus(404);
    }
    //Должен извлекать из токена userId и затем вычислять собеседника для дополнения чата avatar + name
    // const friend = chat.participants.find(
    //   (p) => p._id.toString() === req.body.friendUserId
    // ) as unknown as IUser;
    res.json(chat);
  }
}
export default new ChatController();
