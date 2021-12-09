import { hashPassword } from "./hashPassword";

export const isValidPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword ? true : false;
};
