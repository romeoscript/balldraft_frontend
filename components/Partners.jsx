import React from 'react'
import shoppe from '@/public/images/shoppe.png'
import guardian from '@/public/images/guardian.png'
import gopay from '@/public/images/gopay.png'
import opta from '@/public/images/opta.png'

const Partners = () => {
  return (
   <div className='p-[2rem]'>
   <h1 className='text-center font-bold text-3xl text-black'>Our Partners</h1>
    <div className='flex flex-wrap items-center justify-center gap-8 md:p-[3rem]'>
      <img src={opta.src} alt="" className='max-md:w-[100px]' />
      <img src={gopay.src} alt="" className='max-md:w-[100px]'  />
      <img src={guardian.src} alt="" className='max-md:w-[100px]'  />
      <img src={shoppe.src} alt=""  className='max-md:w-[100px]' />
    </div>
   </div>
  )
}

export default Partners
