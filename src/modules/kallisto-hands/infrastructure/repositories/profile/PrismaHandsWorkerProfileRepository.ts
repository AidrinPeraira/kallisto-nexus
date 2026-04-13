import { IHandsWorkerProfileRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsWorkerProfileRepository";
import { HandsWorkerProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import { prisma } from "@packages/config/prisma";
import { ServiceAssociateMapper } from "@src/modules/kallisto-hands/infrastructure/mappers/ServiceAssociateMapper";

export class PrismaHandsWorkerProfileRepository
  implements IHandsWorkerProfileRepository
{
  async create(
    workerProfile: HandsWorkerProfileEntity,
  ): Promise<HandsWorkerProfileEntity> {
    const created = await prisma.hands_WorkerProfile.create({
      data: {
        serviceAssociateId: workerProfile.serviceAssociateId,
        contractorId: workerProfile.contractorId,
        workingSince: workerProfile.workingSince,
        wagePerDay: workerProfile.wagePerDay,
      },
    });
    return ServiceAssociateMapper.toWorkerProfileDomain(created);
  }

  async findById(id: string): Promise<HandsWorkerProfileEntity | null> {
    const profile = await prisma.hands_WorkerProfile.findUnique({
      where: { id },
    });
    if (!profile) return null;
    return ServiceAssociateMapper.toWorkerProfileDomain(profile);
  }

  async findByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsWorkerProfileEntity | null> {
    const profile = await prisma.hands_WorkerProfile.findUnique({
      where: { serviceAssociateId },
    });
    if (!profile) return null;
    return ServiceAssociateMapper.toWorkerProfileDomain(profile);
  }

  async update(
    workerProfile: Partial<HandsWorkerProfileEntity>,
  ): Promise<HandsWorkerProfileEntity> {
    const { id, ...data } = workerProfile;
    if (!id) throw new Error("ID required for update");
    const updated = await prisma.hands_WorkerProfile.update({
      where: { id },
      data,
    });
    return ServiceAssociateMapper.toWorkerProfileDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.hands_WorkerProfile.delete({
      where: { id },
    });
  }
}
