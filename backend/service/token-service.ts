import jwt, { JwtPayload } from "jsonwebtoken";
import tokenModels from "../models/token-models";
const REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "jwt-refresh-secret-key";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "jwt-secret-key";
class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: "30d",
    });
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId: any, refreshToken: any) {
    const tokenData = await tokenModels.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModels.create({ user: userId, refreshToken });
    return token;
  }
  async verifyRefreshToken(token: string) {
    const decoded = jwt.verify(token, REFRESH_SECRET) as {
      email: string;
      _id: string;
      isActivated: boolean;
      firstName: string;
      surName: string;
    };
    return decoded;
  }
  async verifyAccessToken(token: string) {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    return decoded;
  }
}
export default new TokenService();
