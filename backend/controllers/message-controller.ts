import { Request, Response } from "express";
import messageService from "../service/message-service";
import { MessageType } from "../types";
import { IMessage } from "../messages/interfaces";

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
    const { lastId, limit, chatId } = req.query;
    console.log("chatId", chatId);
    const messages = await messageService.getMessages(
      lastId as string,
      limit as string,
      chatId as string
    );
    console.log("messages", messages);
    res.json(messages);
  }

  async sendMessages(req: Request, res: Response) {
    const messages = await messageService.sendMessages(req.params.id);
    console.log("Id", req.params.id);
    console.log("messages", messages);
    res.json(messages);
  }
}
export default new MessageController();
