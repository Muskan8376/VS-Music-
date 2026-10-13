import { registerUser, generateToken } from '../services/authService.js';
import { generateAndSendOtp, verifyOtp as verifyOtpService, resendOtp as resendOtpService } from '../services/otpService.js';
import { findUserByEmail } from '../models/User.js';

/**
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { username, email, phone, countryCode, country, state, city, password } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username and email address are required fields.'
      });
    }

    const user = await registerUser({
      username,
      email,
      phone,
      countryCode,
      country,
      state,
      city,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Vusic Studio.',
      user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login (dispatches 4-digit code to email)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter both your email address and password.'
      });
    }

    // Generate and send 4-digit code to email
    const { otp, expiresInMinutes, dispatchResult } = await generateAndSendOtp(email);

    const isRealSmtp = Boolean(dispatchResult?.sentViaRealSmtp);

    res.status(200).json({
      success: true,
      requireOtp: true,
      message: isRealSmtp
        ? `A 4-digit verification code has been dispatched to ${email}. Please check your inbox (and spam folder).`
        : 'Enter the 4-digit code sent to your registered email to continue sign in.',
      sentViaRealSmtp: isRealSmtp,
      smtpError: dispatchResult?.smtpError || null,
      otp, // included for seamless development/testing
      email,
      expiresInMinutes
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/verify-otp
 */
export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Both email and 4-digit verification code are required.'
      });
    }

    await verifyOtpService(email, otp);

    const user = findUserByEmail(email) || {
      email,
      username: email.split('@')[0],
      role: 'artist'
    };

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Security verification successful. Signed in.',
      token,
      user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * POST /api/auth/resend-otp
 */
export const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required to resend verification code.'
      });
    }

    const { otp, expiresInMinutes, dispatchResult } = await resendOtpService(email);
    const isRealSmtp = Boolean(dispatchResult?.sentViaRealSmtp);

    res.status(200).json({
      success: true,
      message: isRealSmtp
        ? `A fresh 4-digit verification code has been dispatched to ${email}.`
        : 'A fresh 4-digit verification code has been generated.',
      sentViaRealSmtp: isRealSmtp,
      smtpError: dispatchResult?.smtpError || null,
      otp,
      expiresInMinutes
    });
  } catch (err) {
    next(err);
  }
};
