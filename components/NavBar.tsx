import React from 'react'
import { HomeIcon, ListBulletIcon, Cog8ToothIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

const NavBar = (props: Props) => {
    const inactivlink = 'flex gap-4 items-center p-2 text-2xl';
    const activlink = inactivlink + ' bg-white text-sky-950 rounded-lg';
    const router = useRouter();
    const pathname = router.pathname;

  return (
    <aside className='p-10 text-sky-50 w-[25%]'>
        <Link href="/" className='flex gap-4 mb-4 mr-4 items-center'>
        <span className='text-3xl p-2 underline underline-offset-8'>Ecommerce</span>
        </Link>
        <nav className='flex flex-col gap-4'>
            <Link href={'/'} className={pathname === '/' ? activlink : inactivlink}>
            <HomeIcon className="h-8 w-8 " />
            Dashboard
            </Link>
            <Link href={'/products'} className={pathname.includes('/products') ? activlink : inactivlink}>
            <ArchiveBoxIcon className="h-8 w-8" />
            Products
            </Link>
            <Link href={'/orders'} className={pathname.includes('/orders') ? activlink : inactivlink}>
            <ListBulletIcon className="h-8 w-8" />
            Orders
            </Link>
            <Link href={'/settings'} className={pathname.includes('/settings') ? activlink : inactivlink}>
            <Cog8ToothIcon className="h-8 w-8" />
            Settings
            </Link>
        </nav>
            
    </aside>
  )
}

export default NavBar