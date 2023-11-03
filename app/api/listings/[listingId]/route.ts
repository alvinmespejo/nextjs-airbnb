import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId } = params;
  if (!listingId || typeof listingId !== 'string') {
    throw new Error('Invalid listing ID');
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: 'Unauthorized access.' },
      { status: 401 }
    );
  }

  try {
    const listing = await prisma.listing.delete({
      where: { id: listingId, userId: currentUser.id },
    });

    return NextResponse.json(listing);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'An error occured while processing request.' },
      { status: 500 }
    );
  }
}
