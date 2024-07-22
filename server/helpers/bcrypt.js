import bcrypt from "bcryptjs";

export function encrypt(password) {
  return bcrypt.hashSync(password);
}

export function compare(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}
