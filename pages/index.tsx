import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const {data:session} = useSession();
  
  return (
    <Layout>
      <div className="text-sky-950 flex justify-between">
      <h2> Hello, <b>{session?.user?.name}</b></h2>
      <div className='flex bg-sky-300 mx-2 gap-3 p-2 rounded-lg items-center'>
      <img src={session?.user?.image ?? 'no image'} alt="userimage" className="w-10 rounded-full h-10"/>
      <span className="px-2">{session?.user?.name}</span>
      </div>
      </div>
    </Layout>
   
  );
}
