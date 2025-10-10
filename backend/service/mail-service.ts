import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
class MailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Активация аккаунта",
      text: "",
      html: `Активация: ${activationLink}`,
    });
  }
}

export default new MailService();
