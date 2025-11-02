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
    const { name, age, description, services, businessId } = body;

    if (!name || !age) {
      return NextResponse.json(
        { error: 'Vyplňte všechny povinné údaje' },
        { status: 400 }
      );
    }

    if (!businessId) {
      return NextResponse.json(
        { error: 'Chybí ID podniku' },
        { status: 400 }
      );
    }

    // Najdi podnik a ověř, že patří uživateli
    const business = await prisma.business.findFirst({
      where: {
        id: businessId,
        ownerId: session.user.id,
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Podnik nenalezen nebo nemáte oprávnění' },
        { status: 403 }
      );
    }

    // Automaticky namapuj kategorii podle typu podniku
    let category: Category;
    if (business.profileType === ProfileType.MASSAGE_SALON) {
      category = Category.EROTICKE_MASERKY;
    } else if (business.profileType === ProfileType.PRIVAT) {
      category = Category.HOLKY_NA_SEX;
    } else if (business.profileType === ProfileType.DIGITAL_AGENCY) {
      category = Category.DIGITALNI_SLUZBY;
    } else {
      category = Category.HOLKY_NA_SEX; // Default
    }

    // Generate slug
    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${business.city.toLowerCase()}-${Date.now()}`;

    // Create profile - použij telefon a město z podniku
    const profile = await prisma.profile.create({
      data: {
        name,
        slug,
        age: parseInt(age),
        phone: business.phone, // Telefonní číslo z podniku (stejné pro všechny profily)
        city: business.city, // Město z podniku
        address: business.address, // Adresa z podniku
        description: description || null,
        location: `${business.city}, centrum`,
        profileType: business.profileType, // Typ z podniku
        category, // Automaticky namapovaná kategorie
        ownerId: session.user.id,
        businessId: business.id,
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
