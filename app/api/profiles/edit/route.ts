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
    const { profileId, changes } = body;

    if (!profileId || !changes) {
      return NextResponse.json({ error: 'Chybi profileId nebo changes' }, { status: 400 });
    }

    // Verify the profile belongs to the user
    const profile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        ownerId: session.user.id,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profil nenalezen nebo nemate opravneni' }, { status: 403 });
    }

    // Create a pending change
    const pendingChange = await prisma.pendingChange.create({
      data: {
        type: 'PROFILE_UPDATE',
        profileId: profile.id,
        oldData: {
          name: profile.name,
          age: profile.age,
          description: profile.description,
          height: profile.height,
          weight: profile.weight,
          bust: profile.bust,
          hairColor: profile.hairColor,
          breastType: profile.breastType,
          role: profile.role,
          nationality: profile.nationality,
          languages: profile.languages,
          orientation: profile.orientation,
          tattoos: profile.tattoos,
          piercing: profile.piercing,
          openingHours: profile.openingHours,
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
    console.error('Profile edit error:', error);
    return NextResponse.json({ error: 'Chyba pri odesilani zmen' }, { status: 500 });
  }
}
