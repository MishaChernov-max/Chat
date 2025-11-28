import { v4 as uuidv4 } from "uuid";
import { UserDto } from "../dtos/user-dto";
import userModels from "../models/user-models";
import bcrypt from "bcryptjs";
import tokenService from "./token-service";
import mailService, { sendWithEthereal } from "./mail-service";
import mongoose from "mongoose";

class UserService {
  async registration(
    email: string,
    password: string,
    firstName: string,
    surName: string
  ) {
    const candidate = await userModels.findOne({ email });
    console.log("candidate", candidate);
    if (candidate) {
      throw new Error(`Пользователь с таким ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationCode = uuidv4();
    const user = await userModels.create({
      email,
      password: hashPassword,
      activationCode,
      firstName,
      surName,
    });
    const activationLink = `${process.env.API_URL}/activate/to/${activationCode}`;
    await mailService.sendEmail(
      email,
      "link for activation",
      "",
      `<p><a href="${activationLink}">Move for activation</a></p>`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto._id, tokens.refreshToken);
    return {
      user: userDto,
      ...tokens,
    };
  }

  async activate(activationLink: any) {
    const user = await userModels.findOne({ activationLink });
    if (!user) {
      throw new Error("Некорректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }
  async getUsers(currentUserId: string) {
    return await userModels.find(
      { _id: { $ne: currentUserId } },
      { activationLink: 0, password: 0 }
    );
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
          $or: [
            { firstName: { $regex: `^${req}`, $options: "i" } },
            { surName: { $regex: `^${req}`, $options: "i" } },
          ],
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
      console.log("user", user);
      if (!user) {
        throw new Error(`Аккаунт не найден`);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return { ...tokens, userDto };
      } else {
        throw new Error(`Неверный пароль`);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateUserInformation(_id: string, firstName: string, surName: string) {
    const user = await userModels
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(_id) },
        { $set: { firstName, surName } },
        { new: true }
      )
      .select({ email: 1, firstName: 1, surName: 1 })
      .lean();
    return user;
  }
}
export default new UserService();
