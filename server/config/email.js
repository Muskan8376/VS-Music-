import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

/**
 * Creates and configures Nodemailer transport based on environment variables
 */
export const getTransporter = () => {
  // Dynamically re-read .env so user edits in server/.env apply immediately without restart
  dotenv.config({ override: true });

  // Option 1: Gmail Service with App Password
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '').trim();

  if (gmailUser && gmailAppPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPass
      }
    });
  }

  // Option 2: Generic SMTP Server (Brevo, SendGrid, Hostinger, Mailgun, etc.)
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (smtpHost && smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT) || 587;
    return nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: process.env.SMTP_SECURE === 'true' || port === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });
  }

  return null;
};

export const hasRealEmailConfig = () => {
  const t = getTransporter();
  return Boolean(t);
};

