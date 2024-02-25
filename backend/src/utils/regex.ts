export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

export const phoneNumberRegex = /^\+\d{1,3}\s?[\d\s()-]{5,}$/;

export const nameRegex = /^[\p{L} ,.'-]+$/u;
