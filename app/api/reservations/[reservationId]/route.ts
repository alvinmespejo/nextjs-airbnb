import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

interface IReservationParams {
  reservationId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IReservationParams }
) {
  const { reservationId } = params;
  if (!reservationId) {
    return NextResponse.json(
      { message: 'Resource not found.' },
      { status: 404 }
    );
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: 'Unauthorized access.' },
      { status: 401 }
    );
  }

  try {
    const reservation = await prisma?.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (err) {
    return NextResponse.json(
      { message: 'An error occured while processing request.' },
      { status: 500 }
    );
  }
}
