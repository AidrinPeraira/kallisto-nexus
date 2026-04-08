import { IProfessionalProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IProfessionalProfileRepository";
import { ProfessionalProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { prisma } from "@packages/config/prisma";

export class PrismaProfessionalProfileRepository
  implements IProfessionalProfileRepository
{
  async create(
    profile: ProfessionalProfileEntity,
  ): Promise<ProfessionalProfileEntity> {
    const data: any = {
      serviceProviderId: profile.serviceProviderId,
      workingSince: profile.workingSince,
    };

    const createdProfile = await prisma.bridge_ProfessionalProfile.create({
      data,
    });

    return this.mapToDomain(createdProfile);
  }

  async findById(id: string): Promise<ProfessionalProfileEntity | null> {
    const profile = await prisma.bridge_ProfessionalProfile.findUnique({
      where: { id },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async findByServiceProviderId(
    serviceProviderId: string,
  ): Promise<ProfessionalProfileEntity | null> {
    const profile = await prisma.bridge_ProfessionalProfile.findUnique({
      where: { serviceProviderId },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async update(
    profile: ProfessionalProfileEntity,
  ): Promise<ProfessionalProfileEntity> {
    const { id, ...updateData } = profile;

    if (!id) {
      throw new Error("ProfessionalProfile ID is required for update");
    }

    const updatedProfile = await prisma.bridge_ProfessionalProfile.update({
      where: { id },
      data: updateData as any,
    });

    return this.mapToDomain(updatedProfile);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_ProfessionalProfile.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProfile: any): ProfessionalProfileEntity {
    return {
      id: prismaProfile.id,
      serviceProviderId: prismaProfile.serviceProviderId,
      workingSince: prismaProfile.workingSince || undefined,
    };
  }
}
