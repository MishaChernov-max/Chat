import { Types } from "mongoose";
import { IUser } from "../users/interfaces";
import { IMessage } from "../messages/interfaces";

export interface IChatResponse {
  _id: string | Types.ObjectId;
  participants: string[] | IUser[];
  messages: IMessage[];
  type: "direct" | "group";
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
