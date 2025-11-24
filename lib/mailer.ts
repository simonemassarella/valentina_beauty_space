import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTIFY_GMAIL_USER,
    pass: process.env.NOTIFY_GMAIL_APP_PASSWORD,
  },
});
