import type { INewUser } from "../interfaces/NewUser.model";
import type { TUser } from "../types/User.model";
import type { IUserSanitized } from "../interfaces/UserSanitized";

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\.])[A-Za-z\d@$!%*?&\\.]{8,}$/;
// export const nameRegex = /^[\p{L} ,.'-]+$/u;
export const nameRegex = /^1234$/;

export const sanitizeUsers = (users: TUser[]): IUserSanitized[] =>
  users.map((user: TUser) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

export const sanitizeUser = (user: TUser): IUserSanitized => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const validateUser = (user: INewUser): INewUser | false => {
  const { email, lastName, name, password, dateOfBirth } = user;
  // declare fixed values
  const fixedEmail = email.trim().toLowerCase();
  const fixedName = name.trim().toLowerCase();
  const fixedLastName = lastName.trim().toLowerCase();
  const fixedPassword = password.trim().toLowerCase();
  // check if values are valid
  const isEmailValid = validateEmail(fixedEmail);
  const isNameValid = validateName(fixedName);
  const isLastNameValid = validateName(fixedLastName);
  const isPasswordValid = validatePassword(fixedPassword);
  const isDateOfBirthValid = validateDateOfBirth(dateOfBirth);
  if (
    !isEmailValid ||
    !isNameValid ||
    !isLastNameValid ||
    !isPasswordValid ||
    !isDateOfBirthValid
  ) {
    return false;
  }
  const fixedUser: INewUser = {
    email: fixedEmail,
    lastName: fixedLastName,
    name: fixedName,
    password: fixedPassword,
    dateOfBirth
  };
  return fixedUser;
};

const validateEmail = (email: string): boolean => emailRegex.test(email);
const validateName = (name: string): boolean =>
  name.length > 1 && name.length < 50 && nameRegex.test(name);
const validatePassword = (password: string): boolean =>
  password.length > 7 && password.length < 50 && passwordRegex.test(password);
const validateDateOfBirth = (dateOfBirth: Date): boolean => {
  const now = new Date().getTime();
  const thirteenYears = 13 * 365 * 24 * 60 * 60 * 1000;
  const isOverThirteenYearsOld = now - dateOfBirth.getTime() >= thirteenYears;
  return isOverThirteenYearsOld;
};