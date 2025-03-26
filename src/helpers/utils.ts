import bcrypt from 'bcrypt';

const ROUNDS = 10;

export const genPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(ROUNDS);
  return bcrypt.hash(password, salt);
};