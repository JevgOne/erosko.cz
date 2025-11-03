// Utility functions for phone number handling
// This file is separate from sms.ts to avoid Twilio dependency in edge runtime (middleware)

export function normalizePhoneNumber(phone: string): string {
  // Remove all spaces, dashes, and parentheses
  let normalized = phone.replace(/[\s\-\(\)]/g, '');

  // If starts with +420, keep it
  if (normalized.startsWith('+420')) {
    return normalized;
  }

  // If starts with 420 (without +), add the +
  if (normalized.startsWith('420')) {
    return '+' + normalized;
  }

  // If it's just 9 digits starting with 6 or 7, add +420
  if (/^[67]\d{8}$/.test(normalized)) {
    return '+420' + normalized;
  }

  // Return as-is if doesn't match expected format
  return normalized;
}

export function isValidCzechPhone(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  // Check if it's a valid Czech phone number: +420 followed by 9 digits starting with 6 or 7
  return /^\+420[67]\d{8}$/.test(normalized);
}
