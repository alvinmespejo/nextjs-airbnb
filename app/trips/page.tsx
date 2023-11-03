import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import Trips from './Trips';

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized access!' subTitle='Please sign in.' />
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (!reservations.length) {
    return (
      <EmptyState
        title='No tripes found!'
        subTitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return <Trips currentUser={currentUser} reservations={reservations} />;
};

export default TripsPage;
