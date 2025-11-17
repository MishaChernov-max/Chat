import { Types } from "mongoose";
import { IUser } from "../users/interfaces";
import { IChatResponse } from "../chats/interfaces";

export interface IMessage {
  chat: string;
  sender: string;
  text: string;
  forwardedFrom?: string;
  isEdited?: boolean;
}

export interface IMessageResponse {
  chat: IChatResponse;
  sender: IUser;
  text: string;
  forwardedFrom?: string;
  isEdited?: boolean;
}
