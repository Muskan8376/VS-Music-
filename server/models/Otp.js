const otpMap = new Map();

export const createOtp = (email, otp, ttlMinutes = 8) => {
  const cleanEmail = email.toLowerCase();
  const record = {
    email: cleanEmail,
    otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttlMinutes * 60 * 1000
  };
  otpMap.set(cleanEmail, record);
  return record;
};

export const getOtpByEmail = (email) => {
  if (!email) return null;
  const cleanEmail = email.toLowerCase();
  const record = otpMap.get(cleanEmail);
  if (!record) return null;

  // Check TTL expiry
  if (Date.now() > record.expiresAt) {
    otpMap.delete(cleanEmail);
    return null;
  }

  return record;
};

export const deleteOtp = (email) => {
  if (email) otpMap.delete(email.toLowerCase());
};
