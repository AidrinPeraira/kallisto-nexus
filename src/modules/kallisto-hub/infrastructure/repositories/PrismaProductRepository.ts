import { IProductRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IProductRepository";
import { ProductEntity } from "@src/modules/kallisto-hub/domain/entities/ProductEntity";
import { prisma } from "@packages/config/prisma";
import { ProductStatus } from "@packages/common/enums";

export class PrismaProductRepository implements IProductRepository {
  async create(product: ProductEntity): Promise<ProductEntity> {
    const created = await prisma.vendorProduct.create({
      data: {
        productName: product.productName,
        brandName: product.brandName,
        description: product.description,
        status: product.status || ProductStatus.ACTIVE,
        vendorId: product.vendorId,
        itemId: product.itemId,
        variants: {
          create: product.variants?.map((v) => ({
            sku: v.sku,
            price: v.price,
            stockQuantity: v.stockQuantity,
            selectedSpecs: {
              create: v.selectedSpecs?.map((s) => ({
                specId: s.specId,
                selectedValue: s.selectedValue,
              })) || [],
            },
          })),
        },
      },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
    });

    return this.mapToDomain(created);
  }

  async update(product: Partial<ProductEntity>): Promise<ProductEntity> {
    const { id, variants, ...data } = product;
    if (!id) throw new Error("Product ID is required for update");

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update basic fields
      await tx.vendorProduct.update({
        where: { id },
        data: data as any,
      });

      // 2. Handle variants if provided
      if (variants) {
        // Find existing variants to delete their selections first
        const existingVariants = await tx.vendorProductVariant.findMany({
          where: { vendorProductId: id },
        });

        for (const v of existingVariants) {
          await tx.variantSelection.deleteMany({
            where: { variantId: v.id },
          });
        }

        await tx.vendorProductVariant.deleteMany({
          where: { vendorProductId: id },
        });

        // Recreate variants
        for (const v of variants) {
          await tx.vendorProductVariant.create({
            data: {
              sku: v.sku,
              price: v.price,
              stockQuantity: v.stockQuantity,
              vendorProductId: id,
              selectedSpecs: {
                create: v.selectedSpecs?.map((s) => ({
                  specId: s.specId,
                  selectedValue: s.selectedValue,
                })),
              },
            },
          });
        }
      }

      return tx.vendorProduct.findUnique({
        where: { id },
        include: {
          variants: {
            include: {
              selectedSpecs: true,
            },
          },
        },
      });
    });

    if (!updated) throw new Error("Product update failed");
    return this.mapToDomain(updated);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await prisma.vendorProduct.findUnique({
      where: { id },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
    });

    if (!product) return null;
    return this.mapToDomain(product);
  }

  async findByProductCode(productCode: string): Promise<ProductEntity | null> {
    const product = await prisma.vendorProduct.findUnique({
      where: { productCode },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
    });

    if (!product) return null;
    return this.mapToDomain(product);
  }

  async findByVendorId(vendorId: string): Promise<ProductEntity[]> {
    const products = await prisma.vendorProduct.findMany({
      where: { vendorId },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => this.mapToDomain(p));
  }

  async findByItemId(itemId: string): Promise<ProductEntity[]> {
    const products = await prisma.vendorProduct.findMany({
      where: { itemId },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => this.mapToDomain(p));
  }

  async list(filters?: any): Promise<ProductEntity[]> {
    const products = await prisma.vendorProduct.findMany({
      where: {
        vendorId: filters?.vendorId,
        itemId: filters?.itemId,
        productName: filters?.search
          ? { contains: filters.search, mode: "insensitive" }
          : undefined,
      },
      include: {
        variants: {
          include: {
            selectedSpecs: true,
          },
        },
      },
      take: filters?.limit || 10,
      skip: ((filters?.page || 1) - 1) * (filters?.limit || 10),
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => this.mapToDomain(p));
  }

  async delete(id: string): Promise<void> {
    await prisma.vendorProduct.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProduct: any): ProductEntity {
    return {
      id: prismaProduct.id,
      productCode: prismaProduct.productCode || undefined,
      productName: prismaProduct.productName,
      brandName: prismaProduct.brandName || undefined,
      description: prismaProduct.description || undefined,
      status: prismaProduct.status as ProductStatus,
      vendorId: prismaProduct.vendorId,
      itemId: prismaProduct.itemId,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt,
      variants: prismaProduct.variants?.map((v: any) => ({
        id: v.id,
        sku: v.sku || undefined,
        price: Number(v.price),
        stockQuantity: v.stockQuantity || 0,
        vendorProductId: v.vendorProductId,
        selectedSpecs: v.selectedSpecs?.map((s: any) => ({
          id: s.id,
          variantId: s.variantId,
          specId: s.specId,
          selectedValue: s.selectedValue,
        })),
      })),
    };
  }
}
