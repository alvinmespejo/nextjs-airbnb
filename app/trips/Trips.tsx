'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeReservation, SafeUser } from '../types';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ITripsProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const Trips: React.FC<ITripsProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success('Trip successfully cancelled.');
        router.refresh();
        setDeleteId('');
      } catch (err) {
        setDeleteId('');
        toast.error(
          'An error occurred while processing request. Please try again!'
        );
      }

      // axios
      //   .delete(`/api/reservations/${id}`)
      //   .then(() => {
      //     toast.success('Reservation successfully cancelled.');
      //     router.refresh();
      //   })
      //   .catch((err) => {
      //     toast.error(
      //       'An error occurred while processing request. Please try again!'
      //     );
      //   })
      //   .finally(() => setDeleteId(''));
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title='Trips'
        subTitle="Where you've been and where you're going."
      />

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
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Trips;
