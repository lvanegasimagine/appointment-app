'use client'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { isSignedIn } = useUser()
  const menu = [
    {
      id: 1,
      name: 'Home',
      path: '/'
    },
    {
      id: 2,
      name: 'Explore',
      path: '/explore'
    },
    {
      id: 3,
      name: 'Contact Us',
      path: '/contact'
    }
  ]

  return (
    <header className='flex items-center justify-between p-4 shadow-sm pt-5'>
      <div className="flex items-center gap-10">
        <Link href='/'>
          <Image src='/logo.svg' alt='logo' width={180} height={80} />
        </Link>
        <ul className='md:flex gap-8 hidden'>
          {menu.map((item) => (
            <Link key={item.id} href={item.path}>
              <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='flex gap-4 items-center'>
        {isSignedIn &&
          <Link href={'/my-booking'} className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>My Booking</Link>
        }
        <SignedOut>
          <Link href='/sign-in'>
            <Button>Login</Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl='/' />
        </SignedIn>
      </div>
    </header>
  )
}

export default Header
