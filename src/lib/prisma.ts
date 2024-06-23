import type { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

const prismaClientSingleton = (): PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs> => {
  return new PrismaClient();
};

declare global {
  let prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const prisma = globalThis.prisma ?? prismaClientSingleton();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
