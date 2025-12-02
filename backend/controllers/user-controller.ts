import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import userService from "../service/user-service";
import tokenService from "../service/token-service";

export type userType = {
  _id: Types.ObjectId;
  email: string;
  isActivated: boolean;
};

export type searchResponseType = {
  chats: userType[];
};

class UserController {
  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log("Попал сюда нужно обновить токен", refreshToken);
      if (!refreshToken) {
        return res.status(401).json("Ошибка авторизации");
      }
      const decodedData = await tokenService.verifyRefreshToken(refreshToken);
      const payload = {
        email: decodedData.email,
        _id: decodedData._id,
        isActivated: decodedData.isActivated,
        firstName: decodedData.firstName,
        surName: decodedData.surName,
      };
      const newAccessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET || "jwt-secret-key",
        {
          expiresIn: "15m",
        }
      );
      console.log("Сгенерировал новый токен");
      res.json({ token: newAccessToken });
    } catch (error) {
      res.clearCookie("refreshToken");
      res.status(403).json("Доступ запрещен");
    }
  }

  async registration(req: Request, res: Response) {
    try {
      const { email, password, firstName, surName } = req.body;
      const userData = await userService.registration(
        email,
        password,
        firstName,
        surName
      );
      res.cookie("refreshToken", userData?.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      console.log("Отправляю", {
        ...userData?.user,
        token: userData?.accessToken,
      });
      return res.json({
        user: userData?.user,
        token: userData?.accessToken,
      });
    } catch (e: any) {
      return res.status(400).json({ error: e.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      console.log("refreshToken");
      res.cookie("refreshToken", user?.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      return res.json({
        user: user.userDto,
        token: user.accessToken,
      });
    } catch (e) {
      throw e;
    }
  }

  async activate(req: Request, res: any) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      console.log(e);
    }
  }
  async logout(req: Request, res: Response) {
    try {
    } catch (e) {}
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers(req.user._id);
      return res.json({ users: users });
    } catch (e) {
      // throw e;
      console.log("e", e);
    }
  }
  async getUser(req: any, res: any) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      return res.json({ user: user });
    } catch (e) {
      throw e;
    }
  }
  async search(req: Request, res: Response) {
    try {
      const chats = await userService.search(req.query.q as string);
      const result: searchResponseType = { chats: chats };
      console.log("Отправляю чаты", result);
      return res.json(result);
    } catch (e) {
      throw e;
    }
  }
  async updateUserInformation(req: Request, res: Response) {
    const { _id, firstName, surName } = req.body.userData;
    console.log("req.body", req.body);
    console.log("User to update", { _id, firstName, surName });
    const updatedUser = await userService.updateUserInformation(
      _id,
      firstName,
      surName
    );
    console.log("updatedUser", updatedUser);
    res.json(updatedUser);
  }
}
export default new UserController();
