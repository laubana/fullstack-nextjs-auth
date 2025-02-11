import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password) => {
  return hashSync(password, 12);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return compareSync(plainPassword, hashedPassword);
};
