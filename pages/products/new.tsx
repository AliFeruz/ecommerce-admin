import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useState } from 'react'
import axios from "axios";
import { useRouter } from 'next/router';


const New = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const router = useRouter();

    async function createProduct(e: React.FormEvent) {
        e.preventDefault();
        const data = { title, description, price };
        const response = await axios.post('/api/products', data);
        if (response.status === 200) {
          setTitle('');
          setDescription('');
          setPrice('');
          router.push('/products');
        }
        
      }
      
    
  return (
    <Layout>
    <h1 className='text-2xl text-sky-500'>Add New Product</h1>
    <form onSubmit={createProduct} className='mt-6 p-2'>
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
   
    </Layout>

  )
}

export default New