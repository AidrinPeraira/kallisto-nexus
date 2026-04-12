import { IVendorRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IVendorRepository";
import { VendorEntity } from "@src/modules/kallisto-hub/domain/entities/VendorEntity";
import { prisma } from "@packages/config/prisma";
import { VendorType } from "@packages/common/enums";

export class PrismaVendorRepository implements IVendorRepository {
  async create(vendor: VendorEntity): Promise<VendorEntity> {
    const created = await prisma.vendor.create({
      data: {
        vendorType: vendor.vendorType,
        companyName: vendor.companyName,
        GSTIN: vendor.GSTIN,
        brandName: vendor.brandName,
        profilePicture: vendor.profilePicture,
        email: vendor.email,
        phone: vendor.phone,
        officeAddress: vendor.officeAddress,
        city: vendor.city,
        district: vendor.district,
        state: vendor.state,
        pincode: vendor.pincode,
        country: vendor.country,
        website: vendor.website,
        representativeName: vendor.representativeName,
        representativePhone: vendor.representativePhone,
        whatsappNumber: vendor.whatsappNumber,
        financeAccountId: vendor.financeAccountId,
        accountHolderName: vendor.accountHolderName,
        bankName: vendor.bankName,
        bankBranch: vendor.bankBranch,
        accountNumber: vendor.accountNumber,
        IFSCCode: vendor.IFSCCode,
        UPIId: vendor.UPIId,
        notes: vendor.notes,
        isVerified: vendor.isVerified,
        isActive: vendor.isActive,
      },
    });

    return this.mapToDomain(created);
  }

  async update(vendor: Partial<VendorEntity>): Promise<VendorEntity> {
    const { id, ...data } = vendor;
    if (!id) throw new Error("Vendor ID is required for update");

    const updated = await prisma.vendor.update({
      where: { id },
      data: data as any,
    });

    return this.mapToDomain(updated);
  }

  async findById(id: string): Promise<VendorEntity | null> {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendor) return null;
    return this.mapToDomain(vendor);
  }

  async findByVendorCode(vendorCode: string): Promise<VendorEntity | null> {
    const vendor = await prisma.vendor.findUnique({
      where: { vendorCode },
    });

    if (!vendor) return null;
    return this.mapToDomain(vendor);
  }

  async findByEmail(email: string): Promise<VendorEntity | null> {
    const vendor = await prisma.vendor.findUnique({
      where: { email },
    });

    if (!vendor) return null;
    return this.mapToDomain(vendor);
  }

  async list(filters?: any): Promise<VendorEntity[]> {
    const vendors = await prisma.vendor.findMany({
      where: {
        vendorType: filters?.vendorType,
        companyName: filters?.search
          ? { contains: filters.search, mode: "insensitive" }
          : undefined,
      },
      take: filters?.limit || 10,
      skip: ((filters?.page || 1) - 1) * (filters?.limit || 10),
      orderBy: { createdAt: "desc" },
    });

    return vendors.map((v) => this.mapToDomain(v));
  }

  async delete(id: string): Promise<void> {
    await prisma.vendor.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaVendor: any): VendorEntity {
    return {
      id: prismaVendor.id,
      vendorCode: prismaVendor.vendorCode,
      vendorType: prismaVendor.vendorType as VendorType,
      companyName: prismaVendor.companyName,
      GSTIN: prismaVendor.GSTIN || undefined,
      brandName: prismaVendor.brandName || undefined,
      profilePicture: prismaVendor.profilePicture || undefined,
      email: prismaVendor.email || undefined,
      phone: prismaVendor.phone || undefined,
      officeAddress: prismaVendor.officeAddress || undefined,
      city: prismaVendor.city || undefined,
      district: prismaVendor.district || undefined,
      state: prismaVendor.state,
      pincode: prismaVendor.pincode || undefined,
      country: prismaVendor.country,
      website: prismaVendor.website || undefined,
      representativeName: prismaVendor.representativeName || undefined,
      representativePhone: prismaVendor.representativePhone || undefined,
      whatsappNumber: prismaVendor.whatsappNumber || undefined,
      financeAccountId: prismaVendor.financeAccountId || undefined,
      accountHolderName: prismaVendor.accountHolderName || undefined,
      bankName: prismaVendor.bankName || undefined,
      bankBranch: prismaVendor.bankBranch || undefined,
      accountNumber: prismaVendor.accountNumber || undefined,
      IFSCCode: prismaVendor.IFSCCode || undefined,
      UPIId: prismaVendor.UPIId || undefined,
      notes: prismaVendor.notes || undefined,
      isVerified: prismaVendor.isVerified,
      isActive: prismaVendor.isActive,
      createdAt: prismaVendor.createdAt,
      updatedAt: prismaVendor.updatedAt,
    };
  }
}
