import nodemailer from 'nodemailer';
import 'dotenv/config';

export interface IEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor() {
    const email = process.env.EMAIL_USER;
    const pass = process.env.PASS_USER;

    if (!email || !pass) {
      throw new Error('EMAIL_USER or PASS_USER is not defined in .env');
    }

    this.from = email;

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: pass,
      },
    });
  }

  async sendEmail({ to, subject, text }: IEmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      text,
    });
  }
}
