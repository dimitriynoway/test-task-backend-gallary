import { RegisterBody } from "../interface";

const isValidEmail = (email: string) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validateRegisterData = (data: RegisterBody): { message: string; valid: boolean } => {
  const { email, login, password } = data;

  if (!isValidEmail(email)) {
    return { message: "This is not real email!", valid: false };
  }

  if (login.length < 4) {
    return { message: "too short login", valid: false };
  }

  if (password.length < 4) {
    return { message: "Too short password", valid: false };
  }

  return { valid: true, message: "" };
};
