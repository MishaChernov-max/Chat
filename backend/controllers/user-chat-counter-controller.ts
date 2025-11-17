import userChatCounterModel from "../models/user-chat-counter-model";
import { type Request, type Response } from "express";

class userChatCounterController {
  async markMessagesAsRead(req: Request, res: Response) {
    const result = await userChatCounterModel.findOneAndUpdate(
      { userId: req.body.userId, roomId: req.body.roomId },
      { $set: { unreadCount: 0 } },
      { new: true }
    );
    console.log("result", result);
    res.sendStatus(200);
  }
  async sendChatsInitialData(req: Request, res: Response) {
    const chats = await userChatCounterModel
      .find({
        userId: req.query.userId,
      })
      .select({ unreadCount: 1, senderId: 1 })
      .lean();
    res.json(chats);
    console.log("chats", chats);
  }
}
export default new userChatCounterController();
