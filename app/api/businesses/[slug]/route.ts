import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const business = await prisma.business.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        photos: {
          orderBy: {
            order: 'asc',
          },
        },
        profiles: {
          where: {
            approved: true,
          },
          include: {
            photos: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.error('Error fetching business:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
