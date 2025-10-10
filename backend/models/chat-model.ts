import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  messages: [
    {
      id: String,
      text: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});
export default model("Chat", chatSchema);
