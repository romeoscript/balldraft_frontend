import React from 'react'
import branding from '@/public/images/branding.svg'
import lights from '@/public/images/lights.jpeg'

const ExploreLayout = ({ children , className}) => {
    const containerClass = `${className || ''} bg-gradient  h-[300px] w-full h-[550px] rounded-[20px] relative my-[1rem] `;
    return (
        <div className={containerClass}>
            {/* <img src={lights.src} className='w-full h-full object-cover absolute    z-1 opacity-10' alt="" /> */}
            <img src={branding.src} alt="" className='absolute left-[50%] top-[50%] z-100 translate-x-[-50%] translate-y-[-50%]' />
            <div className='relative h-full z-100'>
                {children}
            </div>
        </div>
    )
}

export default ExploreLayout
