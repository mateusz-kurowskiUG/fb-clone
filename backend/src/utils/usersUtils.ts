import type { INewUser } from "../interfaces/NewUser.model";
import type { TUser } from "../types/User.model";
import type { IUserSanitized } from "../interfaces/UserSanitized";
import { validate as validateUUID } from "uuid";
import axios, { type AxiosResponse } from "axios";
import type { IRegisterResponse } from "../interfaces/ApiResponses.model";
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

const phoneNumberRegex = /^\+\d{1,3}\s?[\d\s()-]{5,}$/;

export const nameRegex = /^[\p{L} ,.'-]+$/u;

export const sanitizeUsers = (users: TUser[]): IUserSanitized[] =>
  users.map((user: TUser) => {
    const { password, role, ...sanitizedUsers } = user;
    return sanitizedUsers;
  });

export const sanitizeUser = (user: TUser): IUserSanitized => {
  const { password, role, ...sanitizedUser } = user;
  return sanitizedUser;
};

export const checkUUID = (id: string): boolean => validateUUID(id);

export const validateUser = (user: INewUser): INewUser | false => {
  const {
    email,
    lastName,
    name,
    password,
    dateOfBirth,
    countryId,
    phoneNumber
  } = user;
  // declare fixed values
  const fixedEmail = email.trim().toLowerCase();
  const fixedName = name.trim().toLowerCase();
  const fixedLastName = lastName.trim().toLowerCase();
  const fixedPassword = password.trim();
  const fixedCountryId = countryId.trim();
  const fixedPhoneNumber = fixPhoneNumber(phoneNumber);
  // check if values are valid
  const isEmailValid = validateEmail(fixedEmail);
  const isNameValid = validateName(fixedName);
  const isLastNameValid = validateName(fixedLastName);
  const isPasswordValid = validatePassword(fixedPassword);
  const isDateOfBirthValid = validateDateOfBirth(dateOfBirth);
  const isCountryIdValid = checkUUID(fixedCountryId);
  const isPhoneNumberValid = validatePhoneNumber(fixedPhoneNumber);
  console.log(
    isEmailValid,
    isNameValid,
    isLastNameValid,
    isPasswordValid,
    isDateOfBirthValid,
    isCountryIdValid,
    isPhoneNumberValid,
    fixedPhoneNumber
  );

  if (
    !isEmailValid ||
    !isNameValid ||
    !isLastNameValid ||
    !isPasswordValid ||
    !isDateOfBirthValid ||
    !isCountryIdValid ||
    !isPhoneNumberValid
  ) {
    return false;
  }
  const fixedUser: INewUser = {
    email: fixedEmail,
    lastName: fixedLastName,
    name: fixedName,
    password: fixedPassword,
    dateOfBirth,
    countryId: fixedCountryId,
    phoneNumber: fixedPhoneNumber
  };
  return fixedUser;
};

const fixPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.replaceAll(" ", "").trim();
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
const validatePhoneNumber = (phoneNumber: string): boolean =>
  phoneNumberRegex.test(phoneNumber);

export const createUser = async (
  user: INewUser
): Promise<AxiosResponse<IRegisterResponse, any>> => {
  const url = "http://localhost:3000/api";
  try {
    const response = await axios.post<IRegisterResponse>(
      `${url}/auth/register`,
      user
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const deleteUser = async (
  user: IUserSanitized
): Promise<AxiosResponse<any, any>> => {
  const url = "http://localhost:3000/api";
  const response = await axios.delete(`${url}/users/${user.id}`);
  return response;
};
