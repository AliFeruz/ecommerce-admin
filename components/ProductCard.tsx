import React from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Product } from '@/types';
import { multiFormatDateString } from '@/lib/utils';

type Props = {
  product: Product
  };


const ProductCard = ({ product }: Props) => (
  <div className='bg-white rounded-md p-4'>
    <div className='flex gap-3 items-center p-2 mb-3 justify-between'>
      <Link href={`/products/delete/${product._id}`}>
      <button>
        <TrashIcon className="w-5 h-5 text-sky-500"/>
        </button>
      </Link>
      <Link href={`/products/edit/${product._id}`}>
        <PencilIcon className="w-5 h-5 text-sky-500"/>
      </Link>
    </div>
    <div className='p-1 border-t border-sky-500'>
      <h1 className='text-xl mb-2'>{product.title}</h1>
    </div>
    <div className="p-1 h-auto rounded-md">
    <p className="text text-lg">{product.description}</p>
    </div>
    <div className='p-1'>
      <img src={product?.images[0]} alt="product img" className='h-24 w-24 rounded-md'/>
    </div>
    <div className='p-1 mb-2'>
    <p className='text-gray-600'>${product.price}</p>
    </div>
    <div className="flex items-center mt-4 border-t border-text pt-4 text-gray-500">
        <span>Created: {multiFormatDateString(product.createdAt)}</span>
      </div>
  </div>
);

export default ProductCard;
