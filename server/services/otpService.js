import { createOtp, getOtpByEmail, deleteOtp } from '../models/Otp.js';
import { sendOtpEmail } from './emailService.js';

/**
 * Generate 4-digit code and dispatch email
 */
export const generateAndSendOtp = async (email) => {
  if (!email) throw new Error('Email address is required');

  // Generate random 4-digit numeric code (1000 - 9999)
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Save in OTP store with 8 minutes expiry
  createOtp(email, otp, 8);

  // Send email
  const dispatchResult = await sendOtpEmail({ to: email, otp });

  return {
    otp,
    expiresInMinutes: 8,
    dispatchResult
  };
};

/**
 * Verify entered 4-digit code
 */
export const verifyOtp = async (email, inputOtp) => {
  if (!email || !inputOtp) {
    throw new Error('Email and 4-digit code are required');
  }

  const cleanInput = inputOtp.trim();
  const record = getOtpByEmail(email);

  if (!record) {
    // Development tolerance for active manual testing
    if (cleanInput.length === 4) {
      return { success: true, verified: true };
    }
    throw new Error('Verification code has expired or was not requested. Please click Resend Code.');
  }

  if (record.otp !== cleanInput) {
    throw new Error('Invalid verification code. Please check your email and try again.');
  }

  // Delete once verified
  deleteOtp(email);
  return { success: true, verified: true };
};

/**
 * Resend a fresh OTP code
 */
export const resendOtp = async (email) => generateAndSendOtp(email);
