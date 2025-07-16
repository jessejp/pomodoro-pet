import type { User as PrismaUserType } from '@prisma/client'

declare global {
  namespace Express {
    interface User extends PrismaUserType {}
  }
}

export {};
