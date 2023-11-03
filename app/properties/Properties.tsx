'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeListing, SafeReservation, SafeUser } from '../types';
import axios from 'axios';
import toast from 'react-hot-toast';

interface IPropertiesProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

const Properties: React.FC<IPropertiesProps> = ({ currentUser, listings }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await axios.delete(`/api/listings/${id}`);
        toast.success('Property successfully deleted.');
        router.refresh();
        setDeleteId('');
      } catch (err) {
        setDeleteId('');
        toast.error(
          'An error occurred while processing request. Please try again!'
        );
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Properties' subTitle='List of your properties' />

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
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deleteId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Properties;
