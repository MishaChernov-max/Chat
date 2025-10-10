import jwt from "jsonwebtoken";
import tokenModels from "../models/token-models";
class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET || "jwt-secret-key",
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "jwt-refresh-secret-key",
      {
        expiresIn: "30d",
      }
    );
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
}
export default new TokenService();
