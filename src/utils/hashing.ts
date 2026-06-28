import bcrypt from "bcrypt";

const generateHash = async (
  payload: string,
  saltRound = 10,
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRound);

  return bcrypt.hash(payload, salt);
};

const hashMatched = async (raw: string, hash: string): Promise<boolean> => {
  const result = await bcrypt.compare(raw, hash);

  return result;
};

export { generateHash, hashMatched };
