import { createUser, findUserByEmail } from '../models/User.js';
import { sendWelcomeEmail } from './emailService.js';

export const registerUser = async (userData) => {
  const existing = findUserByEmail(userData.email);
  if (existing) {
    throw new Error('An account with this email address already exists. Please sign in instead.');
  }

  const user = createUser(userData);
  await sendWelcomeEmail({ to: user.email, username: user.username });
  return user;
};

export const generateToken = (user) => 
  `jwt-vusic-session-${user.id || 'usr'}-${Date.now()}`;
