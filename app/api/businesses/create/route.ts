import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { ProfileType } from '@prisma/client';

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Musíte být přihlášeni' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, phone, email, website, address, city, profileType, equipment, openingHours } = body;

    if (!name || !phone || !city || !profileType) {
      return NextResponse.json(
        { error: 'Vyplňte všechny povinné údaje (název, telefon, město, typ podniku)' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase()}-${Date.now()}`;

    // Create business
    const business = await prisma.business.create({
      data: {
        name,
        slug,
        description: description || null,
        phone,
        email: email || null,
        website: website || null,
        address: address || null,
        city,
        profileType: profileType as ProfileType,
        equipment: equipment || null,
        openingHours: openingHours || null,
        ownerId: session.user.id,
        verified: false,
        isNew: true,
      },
    });

    return NextResponse.json(
      {
        business: {
          id: business.id,
          name: business.name,
          slug: business.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Business creation error:', error);
    return NextResponse.json(
      { error: 'Něco se pokazilo při vytváření podniku' },
      { status: 500 }
    );
  }
}
