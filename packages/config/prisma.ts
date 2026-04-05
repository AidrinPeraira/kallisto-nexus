/**
 * This is the core configuration for prisma.
 * It is used to create an instance of prisma that is connected
 * to the db, that we can use.
 */

import { env } from "@packages/config/env";
import { PrismaClient } from "@packages/database/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = env.DATABASE_URL;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString });
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
