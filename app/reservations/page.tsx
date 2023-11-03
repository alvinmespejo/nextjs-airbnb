import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';

import EmptyState from '../components/EmptyState';
import Reservations from './Reservations';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized access!' subTitle='Please sign in.' />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (!reservations.length) {
    return (
      <EmptyState
        title='No reservations found!'
        subTitle='Looks like you have no reservations on your property.'
      />
    );
  }

  console.log(reservations.length);

  return <Reservations reservations={reservations} currentUser={currentUser} />;
};

export default ReservationPage;
