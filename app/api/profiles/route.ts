import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { ProfileType, Category } from '@prisma/client';

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
    const { name, age, phone, city, profileType, category, businessName, services } = body;

    if (!name || !age || !city || !phone) {
      return NextResponse.json(
        { error: 'Vyplňte všechny povinné údaje' },
        { status: 400 }
      );
    }

    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'Vyberte alespoň jednu službu' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${city.toLowerCase()}-${Date.now()}`;

    // Create profile
    const profile = await prisma.profile.create({
      data: {
        name,
        slug,
        age: parseInt(age),
        phone,
        city,
        location: `${city}, centrum`,
        profileType: profileType as ProfileType,
        category: category as Category,
        ownerId: session.user.id,
        verified: false,
        isNew: true,
      },
    });

    // Add services
    if (services && services.length > 0) {
      for (const serviceName of services) {
        // Find or create service
        let service = await prisma.service.findUnique({
          where: { name: serviceName },
        });

        if (!service) {
          service = await prisma.service.create({
            data: { name: serviceName },
          });
        }

        // Link service to profile
        await prisma.profileService.create({
          data: {
            profileId: profile.id,
            serviceId: service.id,
          },
        });
      }
    }

    return NextResponse.json(
      {
        profile: {
          id: profile.id,
          name: profile.name,
          slug: profile.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { error: 'Něco se pokazilo při vytváření profilu' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '18');
    const skip = (page - 1) * limit;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (city) {
      where.city = city;
    }

    const [profiles, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        include: {
          services: {
            include: {
              service: true,
            },
          },
          photos: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.profile.count({ where }),
    ]);

    return NextResponse.json({
      profiles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Profiles fetch error:', error);
    return NextResponse.json(
      { error: 'Chyba při načítání profilů' },
      { status: 500 }
    );
  }
}
