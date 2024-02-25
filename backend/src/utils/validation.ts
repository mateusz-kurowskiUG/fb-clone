import { emailRegex, nameRegex, passwordRegex, phoneNumberRegex } from "./regex";

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
