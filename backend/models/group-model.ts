import { model, Schema } from "mongoose";

const groupSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    participiants: {
      type: [{ type: Schema.Types.ObjectId, required: true, ref: "User" }],
    },
  },
  {
    versionKey: false,
  }
);
export default model("groupModel", groupSchema);
