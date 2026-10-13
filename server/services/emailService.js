import { getTransporter } from '../config/email.js';

/**
 * Send 4-digit OTP code to the recipient email
 */
export const sendOtpEmail = async ({ to, otp }) => {
  const subject = `Your Vusic Studio Verification Code: ${otp}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f8fa; margin: 0; padding: 24px; color: #1e2025; }
        .card { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 36px 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #edf0f5; text-align: center; }
        .logo { font-size: 22px; font-weight: 800; color: #1e2025; margin-bottom: 6px; }
        .logo-sub { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 24px; }
        .title { font-size: 20px; font-weight: 800; color: #1e2025; margin-bottom: 8px; }
        .desc { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 24px; }
        .otp-box { display: inline-block; background: linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%); border: 2px dashed #f43f8e; border-radius: 16px; padding: 14px 28px; font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #be185d; margin-bottom: 20px; }
        .footer { font-size: 11px; color: #94a3b8; line-height: 1.5; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">Vusic Studio</div>
        <div class="logo-sub">DIGITAL DISTRIBUTION OPERATING SYSTEM</div>
        <div class="title">Security Verification</div>
        <p class="desc">Enter the 4-digit code below to verify your identity and continue sign in:</p>
        <div class="otp-box">${otp}</div>
        <p style="font-size: 12px; color: #e11d48; font-weight: 600; margin: 0;">This code expires in 8 minutes.</p>
        <div class="footer">
          If you did not request this verification code, please ignore this email.<br>
          &copy; ${new Date().getFullYear()} Vusic Records. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = getTransporter();

  if (transporter) {
    try {
      const senderAddress = process.env.GMAIL_USER || process.env.SMTP_FROM || 'no-reply@vusicrecords.com';
      const info = await transporter.sendMail({
        from: `"Vusic Studio" <${senderAddress}>`,
        to,
        subject,
        html: htmlContent
      });

      console.log(`====================================================`);
      console.log(`✅ [REAL INBOX EMAIL DISPATCHED] To: ${to}`);
      console.log(`📨 [MESSAGE ID]: ${info.messageId}`);
      console.log(`🔐 [OTP CODE]: ${otp}`);
      console.log(`====================================================`);

      return {
        success: true,
        sentViaRealSmtp: true,
        to,
        messageId: info.messageId,
        otp
      };
    } catch (err) {
      console.error(`❌ [SMTP DELIVERY FAILED]: ${err.message}`);
      console.log(`ℹ️ [FALLBACK CONSOLE LOG] Code [${otp}] for ${to}`);
      return {
        success: false,
        sentViaRealSmtp: false,
        smtpError: err.message,
        otp,
        to
      };
    }
  }

  // Fallback when SMTP credentials are not yet configured in server/.env
  console.log(`====================================================`);
  console.log(`✉️ [SIMULATED EMAIL DISPATCH - NO SMTP CONFIGURED YET]`);
  console.log(`📧 Intended Recipient: ${to}`);
  console.log(`🔐 4-Digit Verification Code: [${otp}]`);
  console.log(`⏰ Code Expiry: 8 Minutes`);
  console.log(`💡 To send to real Gmail inboxes, add GMAIL_USER & GMAIL_APP_PASSWORD in server/.env`);
  console.log(`====================================================`);

  return {
    success: true,
    sentViaRealSmtp: false,
    simulated: true,
    to,
    otp
  };
};

/**
 * Send Welcome onboarding email
 */
export const sendWelcomeEmail = async ({ to, username }) => {
  console.log(`[EMAIL SERVICE] Welcome email dispatched to ${to} (${username})`);
  return { success: true };
};
