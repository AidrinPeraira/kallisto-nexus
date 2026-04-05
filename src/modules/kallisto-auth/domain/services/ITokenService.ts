import { TokenPayload } from "@packages/common/types";

export interface ITokenService {
  generateAccessToken(payload: TokenPayload): string;
  verifyAccessToken(token: string): TokenPayload;
  getPayload<T>(token: string): T;
}
