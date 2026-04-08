import { IContractorProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IContractorProfileRepository";
import { ContractorProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { prisma } from "@packages/config/prisma";

export class PrismaContractorProfileRepository
  implements IContractorProfileRepository
{
  async create(
    profile: ContractorProfileEntity,
  ): Promise<ContractorProfileEntity> {
    const data: any = {
      serviceProviderId: profile.serviceProviderId,
      workingSince: profile.workingSince,
    };

    const createdProfile = await prisma.bridge_ContractorProfile.create({
      data,
    });

    return this.mapToDomain(createdProfile);
  }

  async findById(id: string): Promise<ContractorProfileEntity | null> {
    const profile = await prisma.bridge_ContractorProfile.findUnique({
      where: { id },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async findByServiceProviderId(
    serviceProviderId: string,
  ): Promise<ContractorProfileEntity | null> {
    const profile = await prisma.bridge_ContractorProfile.findUnique({
      where: { serviceProviderId },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async update(
    profile: ContractorProfileEntity,
  ): Promise<ContractorProfileEntity> {
    const { id, ...updateData } = profile;

    if (!id) {
      throw new Error("ContractorProfile ID is required for update");
    }

    const updatedProfile = await prisma.bridge_ContractorProfile.update({
      where: { id },
      data: updateData as any,
    });

    return this.mapToDomain(updatedProfile);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_ContractorProfile.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProfile: any): ContractorProfileEntity {
    return {
      id: prismaProfile.id,
      serviceProviderId: prismaProfile.serviceProviderId,
      workingSince: prismaProfile.workingSince || undefined,
    };
  }
}
