import { Types } from "mongoose";
import groupModel from "../models/group-model";

class GroupService {
  async addMember(groupId: string, memberId: Types.ObjectId) {
    const group = await this.getGroup(groupId);
    console.log("groupId", groupId);
    if (!group) {
      throw new Error("Группа не найдена");
    }
    const participiant = group.participiants.find(
      (p) => p._id.toString() === memberId.toString()
    );
    if (!participiant) {
      group.participiants.push(memberId);
      await group.save();
    }
    const updatedGroup = await group.populate("participiants");
    return updatedGroup.participiants;
  }
  async createGroup(userId: string, groupName: string) {
    const group = await groupModel.create({
      userId: new Types.ObjectId(userId),
      name: groupName,
      participiants: [userId],
    });
    return group;
  }
  async getGroups(userId?: string) {
    const groups = await groupModel
      .find({ $or: [{ userId: userId }, { participiants: userId }] })
      .populate("userId")
      .populate("participiants");
    return groups;
  }
  async getGroup(_id?: string) {
    const group = await groupModel
      .findOne({ _id })
      .populate("userId")
      .populate("participiants");
    if (group) {
      return group;
    }
  }
}

export default new GroupService();
