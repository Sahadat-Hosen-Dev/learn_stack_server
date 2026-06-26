import { generateHash } from "./hashing";

type returnType = {
  plainOtp: string;
  hashedOtp: string;
};

const generateOtp = async (): Promise<returnType> => {
  const plainOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOtp = await generateHash(plainOtp);

  return { hashedOtp, plainOtp };
};

export default generateOtp;
