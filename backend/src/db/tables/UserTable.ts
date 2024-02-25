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
import type { UpdateUserBody } from "../../interfaces/UpdateUserBody";
import {
  DeleteUserMessage,
  RegisterMessage,
  UpdateUserMessage,
  type IDeleteUserResponse,
  type IRegisterResponse,
  type IUpdateUserResponse
} from "../../interfaces/ApiResponses.model";

class UserTable {
  private readonly prisma: PrismaClient;
  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  public async getUsers(): Promise<IUserSanitized[] | null> {
    const users = await this.prisma.user.findMany();
    if (users === null || users === undefined) return null;

    const sanitizedUsers = sanitizeUsers(users);
    return sanitizedUsers;
  }

  public async getUserById(id: string): Promise<IUserSanitized | null> {
    if (id === "" || id === undefined || id === null || !checkUUID(id))
      return null;

    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    });
    if (user === null) return null;
    const sanitizedUser = sanitizeUser(user);
    return sanitizedUser;
  }

  public async createUser(user: INewUser): Promise<IRegisterResponse> {
    const validated = validateUser(user);
    if (validated === false)
      return { success: false, message: RegisterMessage.ERROR_INVALID_DATA };
    const isCountryValid = await this.prisma.country.findUnique({
      where: { id: user.countryId }
    });
    if (isCountryValid === null)
      return { success: false, message: RegisterMessage.INVALID_COUNTRY };
    const emailExists = this.prisma.user.findUnique({
      where: { email: user.email }
    });
    const phoneExists = this.prisma.user.findUnique({
      where: { phoneNumber: user.phoneNumber }
    });

    const uniqRes = await Promise.all([emailExists, phoneExists]);
    if (uniqRes.some((el) => el !== null))
      return { success: false, message: RegisterMessage.EXISTS };
    const newUser = await this.prisma.user.create({
      data: { ...validated, profile: { create: {} } }
    });
    if (newUser === null)
      return { success: false, message: RegisterMessage.ERROR_SERVER };
    const sanitized = sanitizeUser(newUser);
    return { data: sanitized, success: true, message: RegisterMessage.SUCCESS };
  }

  public async deleteUser(id: string): Promise<IDeleteUserResponse> {
    if (id === "" || id === undefined || id === null || !checkUUID(id))
      return { message: DeleteUserMessage.ERROR, success: false };
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (user === null)
      return { message: DeleteUserMessage.ERROR, success: false };
    try {
      await this.prisma.user.delete({
        where: {
          id
        }
      });
      return { message: DeleteUserMessage.SUCCESS, success: true };
    } catch (_) {
      return { message: DeleteUserMessage.ERROR, success: false };
    }
  }

  public async updateUser(
    id: string,
    body: UpdateUserBody
  ): Promise<IUpdateUserResponse> {
    return { message: UpdateUserMessage.SUCCESS, success: true };
  }
}
export default new UserTable(prisma);
