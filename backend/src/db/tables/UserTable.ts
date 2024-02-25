import type { PrismaClient } from "@prisma/client";
import type { IUserSanitized } from "../../interfaces/UserSanitized";
import {
  checkUUID,
  sanitizeUser,
  sanitizeUsers,
  validateUser
} from "../../utils/usersUtils";
import { prisma } from "../prisma";
import type { INewUser } from "../../interfaces/NewUser.model";

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
    const isCountryValid = await this.prisma.country.findUnique({
      where: { id: user.countryId }
    });
    if (isCountryValid === null) return null;
    const emailExists = await this.prisma.user.findUnique({
      where: { email: user.email }
    });
    const phoneExists = await this.prisma.user.findUnique({
      where: { phoneNumber: user.phoneNumber }
    });
    if (emailExists !== null || phoneExists !== null) return null;
    const newUser = await this.prisma.user.create({
      data: { ...validated, profile: { create: {} } }
    });
    if (newUser === null) {
      return null;
    }
    const sanitized = sanitizeUser(newUser);
    return sanitized;
  }

  public async deleteUser(id: string): Promise<boolean> {
    if (id === "" || id === undefined || id === null || !checkUUID(id))
      return false;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user === null) return false;
    const deleteUser = await this.prisma.user.delete({
      where: {
        id
      }
    });
    return true;
  }
}
export default new UserTable(prisma);
