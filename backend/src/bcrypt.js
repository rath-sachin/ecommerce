import bcrypt from "bcrypt";

export async function hash(password) {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
}

export async function compare(hashed, password) {
  return await bcrypt.compare(password, hashed);
}
