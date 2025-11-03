import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Nepřihlášen' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Nemáte oprávnění' }, { status: 403 });
    }

    const body = await request.json();
    const { type, id, approved } = body;

    if (!type || !id || typeof approved !== 'boolean') {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 });
    }

    if (type === 'business') {
      await prisma.business.update({
        where: { id },
        data: { approved },
      });
    } else if (type === 'profile') {
      await prisma.profile.update({
        where: { id },
        data: { approved },
      });
    } else {
      return NextResponse.json({ error: 'Neplatný typ' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error approving:', error);
    return NextResponse.json({ error: 'Chyba při schvalování' }, { status: 500 });
  }
}
