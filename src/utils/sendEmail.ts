import nodemailer, { Transporter } from "nodemailer";
import { isError } from "./commonTypeGuards";

type SendEmailParams = {
  credential: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({
  credential,
  subject,
  message,
}: SendEmailParams): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hossantopu@gmail.com",
        pass: "qgam gzin okxu gtdd",
      },
    });

    const options = {
      from: '"Solid Buy" <hossantopu@gmail.com>',
      to: credential,
      subject,
      html: message,
    };

    await transporter.sendMail(options);
  } catch (err) {
    if (isError(err)) {
      throw new Error("Sorry failed to send otp. Try again");
    }
    throw "ops";
  }
};
