import { IconType } from 'react-icons';
import { User, Reservation, Listing } from '@prisma/client';

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export type SafeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'updatedAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  updatedAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type TCountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlang: number[];
  region: string;
};

export type TUseFavorite = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export type THeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export type TListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

export type TCategoryInputProps = {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  icon: IconType;
};

export type TListingIdParams = {
  listingId?: string;
};

export type TListingCategoryProps = {
  label: string;
  description: string;
  icon: IconType;
};

export type TListingHeadProps = {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
};

export type TListingInfoProps = {
  user: SafeUser;
  description: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  category:
    | {
        label: string;
        description: string;
        icon: IconType;
      }
    | undefined;
};

export type TListingClientProps = {
  reservations?: SafeReservation[];
  listing: SafeListing & { user: SafeUser };
  currentUser: SafeUser | null;
};
