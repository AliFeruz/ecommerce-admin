import React from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

type ProductCardProps = {
  product: {
    _id: number;
    title: string;
    description: string;
    price: number;
  };
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className='bg-white rounded-md p-4'>
    <div className='flex gap-6 justify-between'>
      <Link href={`/products/${product._id}`}>
        <h2 className='text-xl'>{product.title}</h2>
      </Link>
      <Link href={`/products/${product._id}/edit`}>
        <button>
        <PencilIcon className="w-4 h-4"/>
        </button>
      </Link>
    </div>
    <p className='text-gray-600'>{product.description}</p>
    <p className='text-gray-600'>${product.price}</p>
  </div>
);

export default ProductCard;
