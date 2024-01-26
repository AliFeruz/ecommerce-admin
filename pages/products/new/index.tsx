import Layout from '@/components/Layout'
import React from 'react'
import ProductForm from '@/components/ProductForm';


const NewProduct = () => {
      
  return (
    <Layout>
      <h1 className='text-2xl text-sky-500'>Add Product</h1>
      <ProductForm/>
    </Layout>

  )
}

export default NewProduct