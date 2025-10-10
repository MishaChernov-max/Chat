import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../dtos/user-dto";
import userModels from "../models/user-models";
import bcrypt from "bcryptjs";
import tokenService from "./token-service";
import mongoose from "mongoose";

class UserService {
  async registration(email: string, password: string) {
    try {
      console.log("Mongoose readyState:", mongoose.connection.readyState);
      const candidate = await userModels.findOne({ email });
      if (candidate) {
        throw new Error(`Пользователь с таким ${email} уже существует`);
      }
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuidv4();
      const user = await userModels.create({
        email,
        password: hashPassword,
        activationLink,
      });
      // await mailService.sendActivationMail(
      //   email,
      //   `${process.env.API_URL}/api/activate/${activationLink}`
      // );
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto._id, tokens.refreshToken);
      console.log("tokens", tokens);
      return {
        ...tokens,
        user: userDto,
      };
    } catch (e) {
      console.log("errror", e);
    }
  }
  async activate(activationLink: any) {
    const user = await userModels.findOne({ activationLink });
    if (!user) {
      throw new Error("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
  async getUsers() {
    return await userModels.find({}, { activationLink: 0, password: 0 });
  }
  async getUser(_id: string) {
    return await userModels.findOne(
      { _id },
      { actkivationLin: 0, password: 0 }
    );
  }
  async search(req: string) {
    try {
      return await userModels.find(
        {
          email: { $regex: `^${req}`, $options: "i" },
        },
        { activationLink: 0, password: 0 }
      );
    } catch (e) {
      throw e;
    }
  }
  async login(email: string, password: string) {
    try {
      const user = await userModels.findOne({ email });
      if (!user) {
        throw new Error(`Аккаунт не найден`);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const userDto = new UserDto(user);
        return userDto;
      } else {
        throw new Error(`Неверный пароль`);
      }
    } catch (e) {
      throw e;
    }
  }
  async setUserName(email: string, name: string, surName: string) {
    try {
      const updatedUser = await userModels.findOneAndUpdate(
        { email },
        {
          name,
          surName,
          registrationCompleted: false,
        },
        {
          new: true,
          projection: {
            name: 1,
            surName: 1,
            registrationCompleted: 1,
          },
        }
      );
      if (!updatedUser) {
        throw new Error(`Аккаунт не найден`);
      }
      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}
export default new UserService();
