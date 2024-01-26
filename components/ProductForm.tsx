import Link from 'next/link'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';
import { Product } from '@/types';

type Props = {
  product?: Product | null;
};


const ProductForm = ({product}: Props) => {
    const [title, setTitle] = useState(product?.title ||'');
    const [description, setDescription] = useState(product?.description || '');
    const [price, setPrice] = useState(product?.price ||'');
    const router = useRouter();

    async function saveProduct(e: React.FormEvent) {
        e.preventDefault();
        const data = { title, description, price };

        if (product?._id) {
        const res = await axios.put('/api/products', {...data, _id: product?._id });
          if (res.status === 200) {
            router.push('/products');
          }
        } else {
        const response = await axios.post('/api/products', data);
        if (response.status === 200) {
          setTitle('');
          setDescription('');
          setPrice('');
          router.push('/products');
        }}
      }
      
    
  return (
    <>
    <form onSubmit={saveProduct} className='mt-6 p-2'>
    <label>Name</label>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name" className="mb-3"/>
    <label>Description</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description" className="mb-3"/>
    <label>Price (in USD)</label>
    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="mb-3"/>
    <div className='flex justify-between'>
    <Link href={'/products'} className='btn-primary'>Cancel</Link>
    <button type='submit' className='btn-primary'>Save</button>
    </div>
    </form>
    </>
    

  )
}

export default ProductForm