import React from 'react'
import loader from "@/public/images/loader.gif";
import Image from 'next/image';

const LoadingTemplate = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center p-9'>
        <Image src={loader} alt="" width={100} />
    </div>
  )
}

export default LoadingTemplate