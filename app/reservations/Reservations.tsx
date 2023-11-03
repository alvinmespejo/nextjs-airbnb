'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';

import { SafeReservation, SafeUser } from '../types';

interface IReservationProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}

const Reservations: React.FC<IReservationProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>('');

  const onCancel = useCallback(
    (id: string) => {
      setDeleteId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation successfull cancelled.');
          router.refresh();
        })
        .catch((err) => {
          toast.error(
            'An error occurred while processing request. Please try again!'
          );
        })
        .finally(() => setDeleteId(''));
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Reservations' subTitle='Bookings on your properties' />
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
          gap-8
        '
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default Reservations;
