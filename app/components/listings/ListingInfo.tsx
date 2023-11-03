'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { TListingInfoProps } from '@/app/types';

import useCountries from '@/app/hooks/useCountries';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

const ListingInfo: React.FC<TListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue)?.latlang;

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    []
  );

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div
          className='
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2'
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className='
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500'
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>
            {bathroomCount} bathroom{`${bathroomCount > 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={category.label}
          description={category.description}
          icon={category.icon}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={location} />
    </div>
  );
};

export default ListingInfo;
