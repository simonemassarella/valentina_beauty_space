// Simple in-memory store for password reset tokens.
// In production, replace with a proper Prisma model.

export type ResetTokenData = {
  email: string;
  expires: Date;
};

const resetTokens = new Map<string, ResetTokenData>();

export function setResetToken(token: string, data: ResetTokenData) {
  resetTokens.set(token, data);
}

export function getResetToken(token: string) {
  return resetTokens.get(token);
}

export function deleteResetToken(token: string) {
  resetTokens.delete(token);
}

export function cleanupExpiredTokens() {
  const now = new Date();
  for (const [token, data] of resetTokens.entries()) {
    if (data.expires < now) {
      resetTokens.delete(token);
    }
  }
}
