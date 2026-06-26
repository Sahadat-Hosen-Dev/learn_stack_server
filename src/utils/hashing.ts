import bcrypt from "bcrypt";

const generateHash = async (
  payload: string,
  saltRound = 10,
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRound);

  return bcrypt.hash(payload, salt);
};

export { generateHash };
