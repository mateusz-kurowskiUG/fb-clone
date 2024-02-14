import { PrismaClient } from "@prisma/client";
import Users from "./Users";

const prisma = new PrismaClient();

const users = Users(prisma);
const posts = Posts(prisma);

users
  .count()
  .then((count) => {
    console.log(`There are ${count} users in the database.`);
  })
  .catch((error) => {
    console.error(error);
  });
