import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PlusCircleIcon}  from '@heroicons/react/24/outline'
import axios from 'axios'
import ProductCard from '@/components/ProductCard'

type Product = {
  _id: number;
  title: string;
  description: string;
  price: number;
}
const products = () => {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
    })
  },[])
  return (
    <Layout>
      <Link href={'/products/new'} className='flex rounded-md mb-10 text-white gap-3 bg-sky-500 p-2 items-center'>
        <PlusCircleIcon className="h-8 w-8" />
        <p className='text-2xl'>Add new product</p>
      </Link>
      <div className='p-2 my-4 text-start'>
        <h1 className='text-sky-800 text-2xl font-bold'>Products</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Layout>
  )
}

export default products