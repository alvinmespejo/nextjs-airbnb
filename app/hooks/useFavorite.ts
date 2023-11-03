import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { TUseFavorite } from '@/app/types';

import useLoginModal from './useLoginModal';

const useFavorite = ({ listingId, currentUser }: TUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        loginModal.onOpen();
        return;
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        // toast.success('Success');
      } catch (error) {
        toast.error(
          'An error occured while processing request. Please try again!'
        );
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
