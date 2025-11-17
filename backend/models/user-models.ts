import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    // chats: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Chat",
    //     require: true,
    //   },
    // ],
    email: {
      type: String,
      unique: true,
      required: true,
    },
    avatar: String,
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationCode: {
      type: String,
    },
    firstName: {
      type: String,
    },
    surName: {
      type: String,
    },
  },
  { versionKey: false }
);
export default model("User", userSchema);
