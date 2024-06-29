import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <>
        <div className='p-5'>
            <Image
            src={'./logo.svg'}
            alt='logo'
            width={50}
            height={50}/>
            <Button>Get Started</Button>
        </div>
    </>
  )
}

export default Header