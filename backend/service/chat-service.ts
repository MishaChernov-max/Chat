import mongoose from "mongoose";
import chatModel from "../models/chat-model";

class ChatService {
  USER_EXLUDED_FIELDS = "-activationCode -password";
  async getParticipants(chatId: string) {
    const chat = await chatModel.findOne({ _id: chatId });
    return chat?.participants;
  }
  async getChatById(chatId: string) {
    return await chatModel
      .findOne({ _id: new mongoose.Types.ObjectId(chatId) })
      .populate("messages")
      .populate({ path: "participants", select: this.USER_EXLUDED_FIELDS })
      .lean()
      .exec();
  }
  async getChat(currentUserId: string, friendUserId: string) {
    console.log("currentUserId", currentUserId);
    const chat = await chatModel
      .findOne({
        participants: {
          $all: [
            new mongoose.Types.ObjectId(currentUserId),
            new mongoose.Types.ObjectId(friendUserId),
          ],
        },
        type: "direct",
      })
      .populate("messages")
      .populate({ path: "participants", select: this.USER_EXLUDED_FIELDS })
      .select({ type: 0 })
      .lean()
      .exec();
    if (!chat) {
      const newChat = await chatModel.create({
        participants: [
          new mongoose.Types.ObjectId(currentUserId),
          new mongoose.Types.ObjectId(friendUserId),
        ],
        type: "direct",
      });
      return await chatModel
        .findById(newChat._id)
        .populate("messages")
        .populate({ path: "participants", select: this.USER_EXLUDED_FIELDS })
        .lean()
        .exec();
    }
    return chat;
  }
  async getAllChats(userId: string) {
    const trimmedUserId = userId.trim();
    if (!mongoose.Types.ObjectId.isValid(trimmedUserId)) {
      throw new Error("Invalid userId format provided");
    }
    const userObjectId = new mongoose.Types.ObjectId(trimmedUserId);
    return await chatModel
      .find({
        participants: userObjectId,
        type: "direct",
      })
      .populate("messages")
      .populate({ path: "participants", select: this.USER_EXLUDED_FIELDS })
      .lean()
      .exec();
  }
}

export default new ChatService();
