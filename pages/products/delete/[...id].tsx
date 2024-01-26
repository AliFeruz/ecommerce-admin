import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { Product } from '@/types';


const DeleteProduct = () => {
    const [productInfo, setProductInfo] = useState<Product | null>(null);
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {

      if (!id) {
        return;
      }
      axios.get('/api/products?id='+id).then(res => {
        setProductInfo(res.data);
      })
    }, [id]);

    async function deleteProduct() {
        await axios.delete('/api/products?id='+id);
        router.push('/products');
    }

    function goBack() {
        router.push('/products');
    }
      
  return (
    <Layout>
      <h1 className='text-2xl mb-10 text-sky-500'>Delete Product</h1>
      <div className='flex h-2/3 flex-col gap-15 p-10 rounded-lg bg-sky-200'>
      <h1 className='text-xl text-center text-red-600 font-bold'>Do you really want to delete product &nbsp;<span className='text-sky-500 underline underline-offset-4'>{productInfo?.title}</span> ?</h1>
      <div className='flex p-10 justify-between'>
      <button className='btn-primary' onClick={deleteProduct}>Yes</button>
      <button className='btn-primary' onClick={goBack}>No</button>
      </div>
      </div>
     
    </Layout>

  )
}

export default DeleteProduct