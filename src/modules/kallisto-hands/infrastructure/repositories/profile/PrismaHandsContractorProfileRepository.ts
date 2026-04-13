import { IHandsContractorProfileRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsContractorProfileRepository";
import { HandsContractorProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import { prisma } from "@packages/config/prisma";
import { ServiceAssociateMapper } from "@src/modules/kallisto-hands/infrastructure/mappers/ServiceAssociateMapper";

export class PrismaHandsContractorProfileRepository
  implements IHandsContractorProfileRepository
{
  async create(
    contractorProfile: HandsContractorProfileEntity,
  ): Promise<HandsContractorProfileEntity> {
    const created = await prisma.hands_ContractorProfile.create({
      data: {
        serviceAssociateId: contractorProfile.serviceAssociateId,
        workerCount: contractorProfile.workerCount,
        workingSince: contractorProfile.workingSince,
      },
    });
    return ServiceAssociateMapper.toContractorProfileDomain(created);
  }

  async findById(id: string): Promise<HandsContractorProfileEntity | null> {
    const profile = await prisma.hands_ContractorProfile.findUnique({
      where: { id },
    });
    if (!profile) return null;
    return ServiceAssociateMapper.toContractorProfileDomain(profile);
  }

  async findByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsContractorProfileEntity | null> {
    const profile = await prisma.hands_ContractorProfile.findUnique({
      where: { serviceAssociateId },
    });
    if (!profile) return null;
    return ServiceAssociateMapper.toContractorProfileDomain(profile);
  }

  async update(
    contractorProfile: Partial<HandsContractorProfileEntity>,
  ): Promise<HandsContractorProfileEntity> {
    const { id, ...data } = contractorProfile;
    if (!id) throw new Error("ID required for update");
    const updated = await prisma.hands_ContractorProfile.update({
      where: { id },
      data,
    });
    return ServiceAssociateMapper.toContractorProfileDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.hands_ContractorProfile.delete({
      where: { id },
    });
  }
}
