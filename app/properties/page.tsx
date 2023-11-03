import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import Properties from './Properties';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized access!' subTitle='Please sign in.' />
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (!listings.length) {
    return (
      <EmptyState
        title='No properties found!'
        subTitle='Looks like you have no properties.'
      />
    );
  }

  return <Properties currentUser={currentUser} listings={listings} />;
};

export default PropertiesPage;
