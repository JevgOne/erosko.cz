import { NextResponse } from 'next/server';
import { verifyCode } from '@/lib/sms';

export async function POST(request: Request) {
  try {
    const { phone, code, type } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: 'Telefonní číslo a kód jsou povinné' },
        { status: 400 }
      );
    }

    // Verify the code
    const result = await verifyCode(
      phone,
      code,
      type || 'PHONE_VERIFICATION'
    );

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || 'Neplatný ověřovací kód' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Telefonní číslo bylo úspěšně ověřeno',
    });
  } catch (error: any) {
    console.error('Error in verify-code API:', error);
    return NextResponse.json(
      { error: 'Chyba serveru' },
      { status: 500 }
    );
  }
}
