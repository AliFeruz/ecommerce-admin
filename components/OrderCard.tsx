import React from 'react';
import { OrderType } from '@/types';
import { multiFormatDateString } from '@/lib/utils';

type Props = {
  order: OrderType
  };


const OrderCard = ({ order }: Props) => {

    return (
    <div className='bg-white rounded-md p-4'>
    <div className='flex gap-3 items-center p-2 mb-3 justify-between'>
    </div>
    <div className='p-1 border-t border-sky-500'>
    <h1 className='text-xl mb-2'>{order.name}</h1>
    <p className='mb-2'>{order.email}</p>
    <p className='mb-2'>{order.country}</p>
    <p className='mb-2'>{order.city}</p>
    <p className='mb-2'>{order.address}</p>
    </div>
    <div className="flex items-center mt-4 border-t border-text pt-4 text-gray-500">
    <span>Created: {multiFormatDateString(order.createdAt)}</span>
    </div>
  </div>
    )
}
   
  

export default OrderCard;
