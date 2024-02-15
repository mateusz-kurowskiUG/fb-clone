export type TUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  lastName: string;
} & { password: string };
