import { compareSync, hashSync } from "bcryptjs";

export const hash = (password) => {
  return hashSync(password, 12);
};

export const verify = (plainPassword, hashedPassword) => {
  return compareSync(plainPassword, hashedPassword);
};
