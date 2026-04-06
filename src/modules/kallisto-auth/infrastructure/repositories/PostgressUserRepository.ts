import { IUserRepository } from "@src/modules/kallisto-auth/application/interfaces/repositories/IUserRepository";
import { UserEntity } from "@src/modules/kallisto-auth/domain/entities/UserEntity";
import { UserRole, UserStatus } from "@packages/common/enums";
import { prisma } from "@packages/config/prisma";

export class PostgresUserRepository implements IUserRepository {
  async create(user: UserEntity): Promise<UserEntity> {
    const data: any = {
      authId: user.authId,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profilePic: user.profilePic,
      status: user.status || UserStatus.ACTIVE,
    };

    if (user.userCode) {
      data.userCode = user.userCode;
    }

    const createdUser = await prisma.appUser.create({
      data,
    });

    return this.mapToDomain(createdUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.appUser.findUnique({
      where: { id },
    });

    if (!user) return null;
    return this.mapToDomain(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.appUser.findUnique({
      where: { email },
    });

    if (!user) return null;
    return this.mapToDomain(user);
  }

  async findByUserCode(userCode: string): Promise<UserEntity | null> {
    const user = await prisma.appUser.findUnique({
      where: { userCode },
    });

    if (!user) return null;
    return this.mapToDomain(user);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const updatedUser = await prisma.appUser.update({
      where: { id: user.id },
      data: {
        authId: user.authId,
        userCode: user.userCode,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role as any,
        profilePic: user.profilePic,
        status: user.status as any,
      },
    });

    return this.mapToDomain(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await prisma.appUser.delete({
      where: { id },
    });
  }

  /**
   * Maps a prisma user to a domain user.
   * @param prismaUser The prisma user to map.
   * @returns The domain user.
   */
  private mapToDomain(prismaUser: any): UserEntity {
    return {
      id: prismaUser.id,
      authId: prismaUser.authId,
      userCode: prismaUser.userCode,
      email: prismaUser.email,
      fullName: prismaUser.fullName,
      phoneNumber: prismaUser.phoneNumber || "",
      role: prismaUser.role as UserRole,
      profilePic: prismaUser.profilePic || undefined,
      status: prismaUser.status as UserStatus,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }
}
