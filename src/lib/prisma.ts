import { PrismaClient, Prisma } from '@prisma/client';

// Determine log levels based on DEBUG and NODE_ENV
const isDebug = process.env.DEBUG?.includes('prisma:client');
const logLevels: Prisma.LogLevel[] = isDebug
  ? ['query', 'info', 'warn', 'error']
  : process.env.NODE_ENV === 'development'
  ? ['query', 'error', 'warn']
  : ['error'];

export const prisma = new PrismaClient({ log: logLevels });

// Prevent multiple instances in dev
if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}
