import type { INewUser } from "../interfaces/NewUser.model";
import type { IUpdateUserBody } from "../interfaces/UpdateUserBody";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneNumberRegex
} from "./regex";
import { checkUUID, fixPhoneNumber } from "./usersUtils";
import _ from "lodash";
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

// test this function \/
export const validateUserAsIs = (user: IUpdateUserBody): IUpdateUserBody => {
  const ommited = _.omitBy(user, (value) => _.isNil(value) || value === "");
  const validated: IUpdateUserBody = {};
  if (ommited.email && validateEmail(ommited.email))
    validated.email = ommited.email;
  if (ommited.name && validateName(ommited.name)) validated.name = ommited.name;
  if (ommited.lastName && validateName(ommited.lastName))
    validated.lastName = ommited.lastName;
  if (ommited.dateOfBirth && validateDateOfBirth(ommited.dateOfBirth))
    validated.dateOfBirth = ommited.dateOfBirth;
  if (ommited.countryId && checkUUID(ommited.countryId))
    validated.countryId = ommited.countryId;
  if (ommited.phoneNumber && validatePhoneNumber(ommited.phoneNumber))
    validated.phoneNumber = ommited.phoneNumber;
  if (ommited.password && validatePassword(ommited.password))
    validated.password = ommited.password;
  return validated;
};
