'use client';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface IFavoritesProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const Favorites: React.FC<IFavoritesProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading title='Favorites' subTitle='List of your favorite places.' />

      <div
        className='
        mt-10 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-6 
        gap-8'
      >
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Favorites;
