import { Schema } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  email: string;
  avatar: string;
  firstName: string;
  surName: string;
  isActivated?: boolean;
  activationCode?: string;
}
