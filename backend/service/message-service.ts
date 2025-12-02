import { Mongoose, ObjectId, Schema, SchemaType, Types } from "mongoose";
import mongoose from "mongoose";
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
  async getMessages(lastId: string, limit: string, chatId: string) {
    const isLastId = lastId
      ? {
          _id: {
            $lte: new mongoose.Types.ObjectId(lastId),
          },
        }
      : {};
    return messageModel
      .find({
        chat: new mongoose.Types.ObjectId(chatId),
        ...isLastId,
      })
      .populate("sender")
      .sort({ _id: -1 })
      .limit(parseInt(limit));
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
      .populate({ path: "sender", select: this.USER_EXLUDED_FIELDS })
      .populate("chat")
      .lean();

    await chatModel.findOneAndUpdate(
      { _id: chat },
      { $push: { messages: message._id } },
      { new: true, useFindAndModify: false }
    );
    return newMessage as unknown as IMessageResponse;
  }

  async sendMessages(id: string) {
    return await messageModel
      .find({ chat: new mongoose.Types.ObjectId(id) })
      .populate("sender");
  }
}
export default new MessageService();
