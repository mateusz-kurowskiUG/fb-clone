import type { PrismaClient } from "@prisma/client";
import type { TUser } from "../types/User.model";
import type { IUserSanitized } from "../interfaces/UserSanitized";
import { sanitizeUser } from "../utils/usersUtils";
import { prisma } from "./prisma";

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
    const sanitizedUsers = users.map((user: TUser) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
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
    if (user === null) {
      return null;
    }

    const sanitizedUser = sanitizeUser(user);
    return sanitizedUser;
  }

  public async createUser(user: TUser): Promise<IUserSanitized | null> {
    const { email, name, password, lastName } = user;
    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        lastName
      }
    });
    if (newUser === null) {
      return null;
    }
    const sanitized = sanitizeUser(newUser);
    return sanitized;
  }
}
export default new UserTable(prisma);
