import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <>
        <div className='bg-gray-900 p-5 flex justify-between items-center border shadow-sm text-white'>
            <Image
            src={'./logo.svg'}
            alt='logo'
            width={50}
            height={50}/>
            Finance tracker
            <Button>Get Started</Button>
        </div>
    </>
  )
}

export default Header