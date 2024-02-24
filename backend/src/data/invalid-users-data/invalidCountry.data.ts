import type { INewUser } from "../../interfaces/NewUser.model";
import { validUser } from "../validData";

const invalidCountryIdUsers: INewUser[] = [{ ...validUser }];
export default invalidCountryIdUsers;
