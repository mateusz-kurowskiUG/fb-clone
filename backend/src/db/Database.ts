import type { PrismaClient } from "@prisma/client/extension";

class Database {
  private readonly prisma: PrismaClient;
  constructor(private readonly prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
    this.prisma.$connect();
  }
}

export default Database;
