import MD5 from "crypto-js/md5";

export const hashPassword = (password: string): string => {
  return MD5(password).toString();
};
