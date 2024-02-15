import Layout from '@/components/Layout'
import OrderCard from '@/components/OrderCard';
import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/order';
import { OrderType } from '@/types';
import React from 'react'

type Props = {
  orders: OrderType[]
}


export async function getServerSideProps(){
  await mongooseConnect();
  const orders = await Order.find({});

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      
    }
  }
}


const orders = ({orders}: Props) => {
  return (
    <Layout>
      <h1 className='text-sky-800 text-2xl px-6 font-bold'>Orders</h1>
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {orders.slice().reverse().map((order: OrderType) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </Layout>
  )
}

export default orders