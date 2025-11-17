import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
class MailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "janiya68@ethereal.email",
        pass: "vmVFZ4AgfJUetqmZjH",
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string = "",
    text: string = "",
    html: string = ""
  ) {
    console.log("Params for mail", to, subject, text, html);
    try {
      await this.transporter.sendMail(
        {
          from: "janiya68@ethereal.email",
          to,
          subject,
          text,
          html,
        },
        (error, info) => {
          if (error) {
            console.log("Ошибка:", error);
          } else {
            console.log("Письмо отправлено:", info.response);
          }
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }
}

export async function sendWithEthereal() {
  const account = await nodemailer.createTestAccount(); // свежие креды
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // STARTTLS
    auth: { user: account.user, pass: account.pass },
  });

  const info = await transporter.sendMail({
    from: "Example <no-reply@example.com>",
    to: "user@example.com",
    subject: "Hello from tests",
    text: "Message from local Node.js",
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}
export default new MailService();
