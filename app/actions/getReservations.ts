import prisma from '@/app/libs/prismadb';

interface IReservationParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IReservationParams) {
  const { listingId, userId, authorId } = params;
  const query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (listingId) {
    query.listingId = listingId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
      endDate: reservation.endDate.toISOString(),
      startDate: reservation.startDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
    }));
  } catch (err: any) {
    throw new Error(err);
  }
}
