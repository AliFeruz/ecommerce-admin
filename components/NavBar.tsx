import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react';


const NavBar = () => {
    const inactivlink = 'flex gap-4 rounded-lg border border-sky-300 justify-center items-center p-2 text-2xl';
    const activlink = inactivlink + ' bg-sky-100 text-sky-950 rounded-lg';
    const router = useRouter();
    const pathname = router.pathname;

    async function logOut(){
      await router.push('/');
      await signOut()
    }

  return (
    <aside className='p-6 text-sky-50 w-[30%]'>
        <Link href="/" className='flex gap-4 mb-4 text-sky-200 mr-4 justify-center'>
        <span className='text-3xl p-2 underline underline-offset-8'>Ecommerce</span>
        </Link>
        <nav className='flex flex-col mt-20 h-[80%] justify-between'>
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
            <div className='px-2 ml-10'>
            <button onClick={logOut} className={inactivlink}>
              <h1>Signout</h1>    
            </button>
            </div>
        </nav>
            
    </aside>
  )
}

export default NavBar