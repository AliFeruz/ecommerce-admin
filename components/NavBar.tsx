import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react';


const NavBar = () => {
    const inactivlink = 'flex gap-4 drop-shadow-lg bg-highlight rounded-lg border border-primary justify-center items-center p-2 text-2xl';
    const activlink = inactivlink + ' bg-gray-300 text-primary rounded-lg';
    const router = useRouter();
    const pathname = router.pathname;

    async function logOut(){
      await router.push('/');
      await signOut()
    }

  return (
    <div className='text-gray-500 '>
      <div className='w-full'>
      <Link href="/" className='flex gap-4 mb-4 text-primary mr-4 justify-center'>
      <span className='text-3xl p-2 underline underline-offset-8'>Ecommerce</span>
      </Link>
      </div>
        
        <nav className='flex mt-24 flex-col min-h-[80vh] justify-between'>
            <div className='flex flex-col gap-4'>
            <Link href={'/'} className={pathname === '/' ? activlink : inactivlink}>
            <h1>Dashboard</h1>
            </Link>
            <Link href={'/products'} className={pathname.includes('/products') ? activlink : inactivlink}>
            <h1> Products</h1>
            </Link>
            <Link href={'/categories'} className={pathname.includes('/categories') ? activlink : inactivlink}>
              <h1>Categories</h1>
            </Link>
            <Link href={'/orders'} className={pathname.includes('/orders') ? activlink : inactivlink}>
            <h1>Orders</h1>
            </Link>
            <Link href={'/settings'} className={pathname.includes('/settings') ? activlink : inactivlink}>
              <h1>Settings</h1>    
            </Link>
            </div>
            <div className='px-2'>
            <button onClick={logOut} className={inactivlink}>
              <h1>Signout</h1>    
            </button>
            </div>
        </nav>
            
    </div>
  )
}

export default NavBar