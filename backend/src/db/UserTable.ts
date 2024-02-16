import type { PrismaClient } from "@prisma/client";
import type { IUserSanitized } from "../interfaces/UserSanitized";
import { sanitizeUser, sanitizeUsers, validateUser } from "../utils/usersUtils";
import { prisma } from "./prisma";
import type { INewUser } from "../interfaces/NewUser.model";

class UserTable {
  private readonly prisma: PrismaClient;
  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  public async getUsers(): Promise<IUserSanitized[] | null> {
    const users = await this.prisma.user.findMany();
    if (users === null || users === undefined) {
      return null;
    }
    const sanitizedUsers = sanitizeUsers(users);
    return sanitizedUsers;
  }

  public async getUserById(id: string): Promise<IUserSanitized | null> {
    if (id === "" || id === undefined || id === null) {
      return null;
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (user === null) return null;

    const sanitizedUser = sanitizeUser(user);
    return sanitizedUser;
  }

  public async createUser(user: INewUser): Promise<IUserSanitized | null> {
    const validated = validateUser(user);
    if (validated === false) return null;
    const exists = await this.prisma.user.findUnique({
      where: { email: user.email }
    });
    if (exists !== null) return null;

    const newUser = await this.prisma.user.create({
      data: validated
    });
    if (newUser === null) {
      return null;
    }
    const sanitized = sanitizeUser(newUser);
    return sanitized;
  }
}
export default new UserTable(prisma);
