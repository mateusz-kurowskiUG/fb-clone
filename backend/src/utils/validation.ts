import type { INewUser } from "../interfaces/NewUser.model";
import type { UpdateUserBody } from "../interfaces/UpdateUserBody";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex
} from "./regex";
import { checkUUID, fixPhoneNumber } from "./usersUtils";

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
  // validArray: check if values are valid
  const validArray = [
    validateEmail(fixedEmail),
    validateName(fixedName),
    validateName(fixedLastName),
    validatePassword(fixedPassword),
    validateDateOfBirth(dateOfBirth),
    checkUUID(fixedCountryId),
    validatePhoneNumber(fixedPhoneNumber)
  ];

  if (validArray.some((valid) => !valid)) return false;

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

export const validateEmail = (email: string): boolean => emailRegex.test(email);
export const validateName = (name: string): boolean =>
  name.length > 1 && name.length < 50 && nameRegex.test(name);
export const validatePassword = (password: string): boolean =>
  password.length > 7 && password.length < 50 && passwordRegex.test(password);
export const validateDateOfBirth = (dateOfBirth: Date): boolean => {
  const now = new Date().getTime();
  const thirteenYears = 13 * 365 * 24 * 60 * 60 * 1000;
  const isOverThirteenYearsOld = now - dateOfBirth.getTime() >= thirteenYears;
  return isOverThirteenYearsOld;
};
export const validatePhoneNumber = (phoneNumber: string): boolean =>
  phoneNumberRegex.test(phoneNumber);

export const validateUserAsIs = (user: UpdateUserBody): UpdateUserBody => {
  
};
