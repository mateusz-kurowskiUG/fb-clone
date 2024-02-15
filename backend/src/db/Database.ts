import { PrismaClient } from "@prisma/client";
import type { IUser } from "../types/User.model";
import { sanitizeUser } from "../utils/utils";
import type { IUserSanitized } from "../types/UserSanitized";
const prisma = new PrismaClient();

class Database {
  private readonly prisma: PrismaClient;

  constructor(private readonly prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  public async getUsers(): Promise<IUserSanitized[] | null> {
    const users = await this.prisma.user.findMany();
    if (users === null || users === undefined) {
      return null;
    }
    const sanitizedUsers = users.map((user: IUser) => {
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

  public async createUser(user: IUser): Promise<IUser | null> {
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

export default new Database(prisma);
