import type { PrismaClient } from "@prisma/client/extension";
import Database from "./Database";

class Users extends Database {
  users: any;
  constructor(prismaInstance: PrismaClient) {
    super(prismaInstance);
    this.users = prismaInstance.user;
  }
}
export default Users;
