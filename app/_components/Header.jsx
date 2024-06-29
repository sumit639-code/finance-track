import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
const Header = () => {
  return (
    <>
        <div className='p-5 flex justify-between'>
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