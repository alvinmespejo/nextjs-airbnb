import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: 'Unauthorized access.' },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.json(
      { message: 'Invalid supplied data.' },
      { status: 422 }
    );
  }

  try {
    const createListingReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(createListingReservation);
  } catch (err) {
    // console.log('RESERVATION API ERROR.', err);
    return NextResponse.json(
      { message: 'An error occured while processing request.' },
      { status: 500 }
    );
  }
}
