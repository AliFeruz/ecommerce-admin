import Layout from '@/components/Layout'
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const EditProduct = () => {
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

  return (
    <Layout>
    <h1 className='text-2xl text-sky-500'>Edit Product</h1>
    {productInfo && <ProductForm product={productInfo}/>}
    </Layout>
  )
}

export default EditProduct