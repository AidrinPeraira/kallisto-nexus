import { UserRole, UserStatus } from "@packages/common/enums";

export interface UserEntity {
  id: string;
  authId: string;
  userCode: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  profilePic?: string;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
