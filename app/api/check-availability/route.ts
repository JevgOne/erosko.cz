import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, value } = body;

    if (!type || !value) {
      return NextResponse.json(
        { error: 'Chybí parametry' },
        { status: 400 }
      );
    }

    let isAvailable = true;

    if (type === 'businessName') {
      // Kontrola jména v Business tabulce
      const existingBusiness = await prisma.business.findFirst({
        where: {
          name: {
            equals: value,
            mode: 'insensitive' // case-insensitive
          }
        },
      });
      isAvailable = !existingBusiness;
    } else if (type === 'phone') {
      // Kontrola telefonu v Business i Profile tabulkách
      const [existingBusiness, existingProfile] = await Promise.all([
        prisma.business.findFirst({
          where: { phone: value },
        }),
        prisma.profile.findFirst({
          where: { phone: value },
        }),
      ]);
      isAvailable = !existingBusiness && !existingProfile;
    }

    return NextResponse.json({ isAvailable });
  } catch (error) {
    console.error('Check availability error:', error);
    return NextResponse.json(
      { error: 'Chyba při kontrole dostupnosti' },
      { status: 500 }
    );
  }
}
