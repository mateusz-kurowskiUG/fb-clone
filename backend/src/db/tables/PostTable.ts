import type { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";

class PostTable {
  private readonly prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  hello(): void {
    console.log("hello");
  }
}
export default new PostTable(prisma);
