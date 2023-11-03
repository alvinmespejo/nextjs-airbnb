import { TListingIdParams } from '@/app/types';

import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/EmptyState';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

import ListingClient from './ListingClient';

const ListingPage = async ({ params }: { params: TListingIdParams }) => {
  const [currentUser, listing, reservations] = await Promise.all([
    getCurrentUser(),
    getListingById(params),
    getReservations(params),
  ]);

  if (!listing) {
    return <EmptyState title='Bummer! Sorry resource does not exist' />;
  }

  return (
    <div>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};
export default ListingPage;
