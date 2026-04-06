import { TokenType } from "@packages/common/enums";

export type TokenPayload = {
  userId: string;
  userCode: string;
  fullName: string;
  role: string;
  email: string;
  tokenType: TokenType;
};
