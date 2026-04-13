import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { ServiceAssociateEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import { prisma } from "@packages/config/prisma";
import { ServiceAssociateMapper } from "@src/modules/kallisto-hands/infrastructure/mappers/ServiceAssociateMapper";
import { ServiceAssociateStatus } from "@packages/common/enums";

export class PrismaServiceAssociateRepository
  implements IServiceAssociateRepository
{
  async create(
    serviceAssociate: ServiceAssociateEntity,
  ): Promise<ServiceAssociateEntity> {
    const data: any = {
      userId: serviceAssociate.userId,
      displayName: serviceAssociate.displayName,
      saType: serviceAssociate.saType,
      status: serviceAssociate.status || ServiceAssociateStatus.ONBOARDING,
      isIdentityAdded: serviceAssociate.isIdentityAdded ?? false,
      isAddressAdded: serviceAssociate.isAddressAdded ?? false,
      isSkillsAdded: serviceAssociate.isSkillsAdded ?? false,
      isCredentialsAdded: serviceAssociate.isCredentialsAdded ?? false,
      isBankDetailsAdded: serviceAssociate.isBankDetailsAdded ?? false,
    };

    const optionalFields: (keyof ServiceAssociateEntity)[] = [
      "profilePicture",
      "address",
      "email",
      "phone",
      "primarySkill",
      "subSkills",
      "governmentIdType",
      "governmentIdNumber",
      "PAN",
      "financeAccountId",
      "maskedAccountNumber",
      "bankName",
    ];

    optionalFields.forEach((field) => {
      if (serviceAssociate[field] !== undefined) {
        data[field as string] = serviceAssociate[field];
      }
    });

    const createdSa = await prisma.hands_ServiceAssociate.create({
      data,
      include: {
        contractorProfile: true,
        workerProfile: true,
        serviceAreas: true,
      },
    });

    return ServiceAssociateMapper.toDomain(createdSa);
  }

  async findById(id: string): Promise<ServiceAssociateEntity | null> {
    const sa = await prisma.hands_ServiceAssociate.findUnique({
      where: { id },
      include: {
        contractorProfile: true,
        workerProfile: true,
        serviceAreas: true,
      },
    });

    if (!sa) return null;
    return ServiceAssociateMapper.toDomain(sa);
  }

  async findByUserId(userId: string): Promise<ServiceAssociateEntity | null> {
    const sa = await prisma.hands_ServiceAssociate.findUnique({
      where: { userId },
      include: {
        contractorProfile: true,
        workerProfile: true,
        serviceAreas: true,
      },
    });

    if (!sa) return null;
    return ServiceAssociateMapper.toDomain(sa);
  }

  async findBySaCode(saCode: string): Promise<ServiceAssociateEntity | null> {
    const sa = await prisma.hands_ServiceAssociate.findUnique({
      where: { saCode },
      include: {
        contractorProfile: true,
        workerProfile: true,
        serviceAreas: true,
      },
    });

    if (!sa) return null;
    return ServiceAssociateMapper.toDomain(sa);
  }

  async update(
    serviceAssociate: Partial<ServiceAssociateEntity>,
  ): Promise<ServiceAssociateEntity> {
    const { id, ...updateData } = serviceAssociate;

    if (!id) {
      throw new Error("ServiceAssociate ID is required for update");
    }

    const updatedSa = await prisma.hands_ServiceAssociate.update({
      where: { id },
      data: updateData as any,
      include: {
        contractorProfile: true,
        workerProfile: true,
        serviceAreas: true,
      },
    });

    return ServiceAssociateMapper.toDomain(updatedSa);
  }

  async delete(id: string): Promise<void> {
    await prisma.hands_ServiceAssociate.delete({
      where: { id },
    });
  }
}
