import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import EmptyState from '../components/EmptyState';
import Favorites from './Favorites';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized access!' subTitle='Please sign in.' />
    );
  }

  const favorites = await getFavoriteListings();
  if (!favorites.length) {
    return (
      <EmptyState
        title='No favorites found'
        subTitle='Looks like you have no favorite listings.'
      />
    );
  }

  return <Favorites currentUser={currentUser} listings={favorites} />;
};

export default FavoritesPage;
