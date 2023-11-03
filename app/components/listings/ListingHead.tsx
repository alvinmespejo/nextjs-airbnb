'use client';

import Image from 'next/image';

import { TListingHeadProps } from '@/app/types';

import useCountries from '@/app/hooks/useCountries';

import Heading from '../Heading';
import HeartButton from '../HeartButton';

const ListingHead: React.FC<TListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className='
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative'
      >
        <Image
          fill
          alt='Image'
          className='object-cover w-full'
          src={imageSrc}
        />

        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
