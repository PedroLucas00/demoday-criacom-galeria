import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
};

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;