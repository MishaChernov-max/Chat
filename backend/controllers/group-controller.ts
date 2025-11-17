import groupService from "../service/group-service";
import { Request, Response } from "express";

class GroupController {
  async addMember(req: Request, res: Response) {
    const groupData = req.body.groupData;
    const { groupId, memberId } = groupData;
    const updatedGroup = await groupService.addMember(groupId, memberId);
    res.json({ groupId: groupId, participiants: updatedGroup });
  }
  async createGroup(req: Request, res: Response) {
    try {
      console.log("Получил название группы", req.body.groupName);
      const group = await groupService.createGroup(
        req.body.userId,
        req.body.groupName
      );
      console.log("Создал группу", group);
      res.json(group);
    } catch (e) {
      throw e;
    }
  }
  async getGroups(req: Request, res: Response) {
    try {
      const userId =
        typeof req.query.userId === "string" ? req.query.userId : undefined;
      const groups = await groupService.getGroups(userId);
      console.log("req.query.userId", req.query.userId);
      res.json(groups);
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getGroup(req: Request, res: Response) {
    try {
      console.log("Получаю группу");
      const groupId =
        typeof req.query.groupId === "string" ? req.query.groupId : undefined;
      console.log("groupId", groupId);
      const group = await groupService.getGroup(groupId);
      console.log(group, "group");
      res.json(group);
    } catch (e) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new GroupController();
