import dailyService from "../service/daily-service";
import { Request, Response } from "express";

class DailyController {
  async createRoom(req: Request, res: Response) {
    const room = await dailyService.createRoom();
    res.json(room);
  }
}
export default new DailyController();
