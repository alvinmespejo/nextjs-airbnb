'use client';

import { Range } from 'react-date-range';
// import Calendar from '../inputs/Calendar';
import DatePicker from '../inputs/Calendar';
import Button from '../Button';

export type TListingReservationProps = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled?: boolean;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
};

const ListingReservation: React.FC<TListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div
      className='
      bg-white
      rounded-xl
      border-[1px]
      border-neutral-200
      overflow-hidden'
    >
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>$ {price}</div>
        <div className='font-light text-neutral-600'>night</div>
      </div>
      <hr />
      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='px-4 pt-4 pb-1'>
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>
      <div
        className='
        p-4
        flex 
        flex-row
        items-center
        justify-between
        text-lg
        font-semibold'
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
