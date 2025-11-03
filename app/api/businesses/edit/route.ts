import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Musite byt prihlaseni' }, { status: 401 });
    }

    const body = await request.json();
    const { businessId, changes } = body;

    if (!businessId || !changes) {
      return NextResponse.json({ error: 'Chybi businessId nebo changes' }, { status: 400 });
    }

    // Verify the business belongs to the user and fetch current photos
    const business = await prisma.business.findFirst({
      where: {
        id: businessId,
        ownerId: session.user.id,
      },
      include: {
        photos: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!business) {
      return NextResponse.json({ error: 'Podnik nenalezen nebo nemate opravneni' }, { status: 403 });
    }

    // Create a pending change
    const pendingChange = await prisma.pendingChange.create({
      data: {
        type: 'BUSINESS_UPDATE',
        businessId: business.id,
        oldData: {
          name: business.name,
          description: business.description,
          phone: business.phone,
          email: business.email,
          website: business.website,
          address: business.address,
          city: business.city,
          openingHours: business.openingHours,
          photos: business.photos.map(p => ({ id: p.id, url: p.url, order: p.order, isMain: p.isMain })),
        },
        newData: changes,
        requestedById: session.user.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Zmeny odeslany ke schvaleni administratorem',
      changeId: pendingChange.id,
    });
  } catch (error) {
    console.error('Business edit error:', error);
    return NextResponse.json({ error: 'Chyba pri odesilani zmen' }, { status: 500 });
  }
}
