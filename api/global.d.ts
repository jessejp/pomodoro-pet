import { User as PrismaUserType } from './generated/prisma';

declare global {
  namespace Express {
    interface User extends PrismaUserType {}
  }
}

export {};
