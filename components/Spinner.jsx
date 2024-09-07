import React from 'react'
import Image from 'next/image';


const Spinner = ({w=100}) => {
  return (
    <div>
        <Image src={loader} alt="" width={w} />
    </div>
  )
}

export default Spinner