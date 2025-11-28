import { NextFunction, Request, Response } from "express";
import tokenService from "../service/token-service";
import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  _id: string;
}
declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

export const accessTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ error: "Неверный токен" });
  }
  const payload = await tokenService.verifyAccessToken(token as string);
  if (!payload) {
    return res.status(401).json({ error: "Неверный токен" });
  }
  console.log("payload", payload);
  req.user = payload as TokenPayload;
  next();
};
