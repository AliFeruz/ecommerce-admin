import React from 'react'
import { HomeIcon, ListBulletIcon, Cog8ToothIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {}

const NavBar = (props: Props) => {
    const inactivlink = 'flex gap-4 text-red-400 items-center p-2 text-2xl';
    const activlink = inactivlink+ `bg-white text-sky-100 rounded-lg`;


  return (
    <aside className='p-4'>
        <Link href="" className='flex gap-4 mb-4 mr-2 text-3xl items-center text-sky-100'>
        <HomeIcon className="h-10 w-10 " />
        <span>Admin Dashboard</span>
        </Link>
        <nav className='flex flex-col gap-4'>
        <Link href={'/products'} className={`${inactivlink}`}>
            <ArchiveBoxIcon className="h-8 w-8" />
            Products
            </Link>
            <Link href={'/orders'} className={`${inactivlink}`}>
            <ListBulletIcon className="h-8 w-8" />
            Orders
            </Link>
            <Link href={'/settings'} className={`${inactivlink}`}>
            <Cog8ToothIcon className="h-8 w-8" />
            Settings
            </Link>
        </nav>
            
    </aside>
  )
}

export default NavBar