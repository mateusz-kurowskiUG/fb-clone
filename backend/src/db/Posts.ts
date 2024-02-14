import type { PrismaClient } from "@prisma/client/extension";
import Database from "./Database";

class Posts extends Database {
  posts: any;
  constructor(prismaInstance: PrismaClient) {
    super(prismaInstance);
    this.posts = prismaInstance.posts;
  }
}
export default Posts;
