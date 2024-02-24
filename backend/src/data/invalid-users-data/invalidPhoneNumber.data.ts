import type { INewUser } from "../../interfaces/NewUser.model";
import { validUser } from "../validData";

const invalidPhoneNumberUsers: INewUser[] = [
  { ...validUser, phoneNumber: "" },
  { ...validUser, phoneNumber: "    " },
  { ...validUser, phoneNumber: "123" },
  { ...validUser, phoneNumber: "456" },
  { ...validUser, phoneNumber: "456" },
  { ...validUser, phoneNumber: "123@456789" },
  { ...validUser, phoneNumber: "123a45d6789" },
  { ...validUser, phoneNumber: "123.456789" },
  { ...validUser, phoneNumber: "123,456,789" },
  { ...validUser, phoneNumber: "".repeat(100) }
];
export default invalidPhoneNumberUsers;
