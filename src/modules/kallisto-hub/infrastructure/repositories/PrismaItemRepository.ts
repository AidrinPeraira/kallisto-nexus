import { IItemRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IItemRepository";
import { ItemEntity } from "@src/modules/kallisto-hub/domain/entities/ItemEntity";
import { prisma } from "@packages/config/prisma";
import { MaterialCategory, UnitOfMeasure } from "@packages/common/enums";

export class PrismaItemRepository implements IItemRepository {
  async create(item: ItemEntity): Promise<ItemEntity> {
    const created = await prisma.item.create({
      data: {
        name: item.name,
        category: item.category,
        hsnCode: item.hsnCode,
        imageUrl: item.imageUrl,
        unitOfMeasure: item.unitOfMeasure,
        description: item.description,
        isActive: item.isActive,
        specifications: {
          create: item.specifications?.map((s) => ({
            specName: s.specName,
            specValues: s.specValues,
          })) || [],
        },
      },
      include: {
        specifications: true,
      },
    });

    return this.mapToDomain(created);
  }

  async update(item: Partial<ItemEntity>): Promise<ItemEntity> {
    const { id, specifications, ...data } = item;
    if (!id) throw new Error("Item ID is required for update");

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      await tx.item.update({
        where: { id },
        data: data as any,
      });

      // 2. Handle specifications if provided
      if (specifications) {
        // Simple strategy: delete existing and recreate
        await tx.specifications.deleteMany({
          where: { itemId: id },
        });

        await tx.specifications.createMany({
          data: specifications.map((s) => ({
            specName: s.specName,
            specValues: s.specValues,
            itemId: id,
          })),
        });
      }

      return tx.item.findUnique({
        where: { id },
        include: { specifications: true },
      });
    });

    if (!updated) throw new Error("Item update failed");
    return this.mapToDomain(updated);
  }

  async findById(id: string): Promise<ItemEntity | null> {
    const item = await prisma.item.findUnique({
      where: { id },
      include: { specifications: true },
    });

    if (!item) return null;
    return this.mapToDomain(item);
  }

  async findByItemCode(itemCode: string): Promise<ItemEntity | null> {
    const item = await prisma.item.findUnique({
      where: { itemCode },
      include: { specifications: true },
    });

    if (!item) return null;
    return this.mapToDomain(item);
  }

  async findAll(filters?: any): Promise<ItemEntity[]> {
    const items = await prisma.item.findMany({
      where: {
        category: filters?.category,
        name: filters?.search
          ? { contains: filters.search, mode: "insensitive" }
          : undefined,
        isActive: true,
      },
      include: { specifications: true },
      take: filters?.limit || 10,
      skip: ((filters?.page || 1) - 1) * (filters?.limit || 10),
      orderBy: { createdAt: "desc" },
    });

    return items.map((i) => this.mapToDomain(i));
  }

  async delete(id: string): Promise<void> {
    await prisma.item.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaItem: any): ItemEntity {
    return {
      id: prismaItem.id,
      itemCode: prismaItem.itemCode,
      name: prismaItem.name,
      category: prismaItem.category as MaterialCategory,
      hsnCode: prismaItem.hsnCode || undefined,
      imageUrl: prismaItem.imageUrl || undefined,
      unitOfMeasure: prismaItem.unitOfMeasure as UnitOfMeasure,
      description: prismaItem.description || undefined,
      isActive: prismaItem.isActive,
      createdAt: prismaItem.createdAt,
      updatedAt: prismaItem.updatedAt,
      specifications: prismaItem.specifications?.map((s: any) => ({
        id: s.id,
        specName: s.specName,
        specValues: s.specValues,
        itemId: s.itemId,
      })),
    };
  }
}
