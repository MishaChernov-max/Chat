import { model, Schema } from "mongoose";

const chatScema = new Schema(
  {
    participants: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    type: {
      type: String,
      enum: ["direct", "group"],
      require: true,
    },
    name: String,
    avatar: String,
  },
  { versionKey: false, timestamps: true }
);
export default model("Chat", chatScema);
