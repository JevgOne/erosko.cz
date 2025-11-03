import twilio from 'twilio';
import prisma from '@/lib/prisma';
import { VerificationCodeType } from '@prisma/client';
import { normalizePhoneNumber, isValidCzechPhone } from '@/lib/phone-utils';

// Re-export phone utils for convenience
export { normalizePhoneNumber, isValidCzechPhone } from '@/lib/phone-utils';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: ReturnType<typeof twilio> | null = null;

// Only initialize if credentials are available
if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send SMS verification code
 */
export async function sendVerificationCode(
  phone: string,
  type: VerificationCodeType,
  userId?: string
): Promise<{ success: boolean; error?: string; code?: string }> {
  try {
    // Normalize phone number (remove spaces, add +420 if needed)
    const normalizedPhone = normalizePhoneNumber(phone);

    // Generate 6-digit code
    const code = generateVerificationCode();

    // Code expires in 10 minutes
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    // Save code to database
    await prisma.verificationCode.create({
      data: {
        phone: normalizedPhone,
        code,
        type,
        expiresAt,
        userId,
      },
    });

    // Prepare SMS message
    const message = type === 'PASSWORD_RESET'
      ? `Váš ověřovací kód pro reset hesla je: ${code}. Platnost: 10 minut.`
      : `Váš ověřovací kód pro EROSKO.CZ je: ${code}. Platnost: 10 minut.`;

    // Send SMS via Twilio (if configured)
    if (twilioClient && twilioPhone) {
      try {
        await twilioClient.messages.create({
          body: message,
          from: twilioPhone,
          to: normalizedPhone,
        });
        console.log(`✅ SMS sent to ${normalizedPhone}`);
      } catch (twilioError: any) {
        console.error('❌ Twilio SMS error:', twilioError.message);

        // In development, log the code instead
        if (process.env.NODE_ENV === 'development') {
          console.log('📱 [DEV MODE] Verification code:', code);
          console.log('📱 [DEV MODE] Phone:', normalizedPhone);
          return { success: true, code }; // Return code in dev mode for testing
        }

        return {
          success: false,
          error: `Chyba při odesílání SMS: ${twilioError.message}`
        };
      }
    } else {
      // Development mode without Twilio credentials
      console.log('📱 [DEV MODE] SMS not configured, logging code instead:');
      console.log('📱 [DEV MODE] Phone:', normalizedPhone);
      console.log('📱 [DEV MODE] Code:', code);
      console.log('📱 [DEV MODE] Message:', message);
      return { success: true, code }; // Return code in dev mode
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error sending verification code:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verify SMS code
 */
export async function verifyCode(
  phone: string,
  code: string,
  type: VerificationCodeType
): Promise<{ valid: boolean; userId?: string; error?: string }> {
  try {
    const normalizedPhone = normalizePhoneNumber(phone);

    // Find the most recent valid code
    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        phone: normalizedPhone,
        code,
        type,
        verified: false,
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verificationCode) {
      return {
        valid: false,
        error: 'Neplatný nebo expirovaný kód'
      };
    }

    // Mark as verified
    await prisma.verificationCode.update({
      where: { id: verificationCode.id },
      data: { verified: true },
    });

    return {
      valid: true,
      userId: verificationCode.userId || undefined
    };
  } catch (error: any) {
    console.error('Error verifying code:', error);
    return { valid: false, error: error.message };
  }
}

/**
 * Clean up expired verification codes (should be run periodically)
 */
export async function cleanupExpiredCodes(): Promise<number> {
  try {
    const result = await prisma.verificationCode.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired codes:', error);
    return 0;
  }
}

/**
 * Normalize phone number to international format
 * Accepts: +420123456789, 420123456789, 123456789, +420 123 456 789
 * Returns: +420123456789
 */

/**
 * Format phone number for display
 * +420123456789 → +420 123 456 789
 */
export function formatPhoneNumber(phone: string): string {
  const normalized = normalizePhoneNumber(phone);

  if (normalized.startsWith('+420')) {
    const digits = normalized.substring(4);
    return `+420 ${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
  }

  return normalized;
}
