import React from 'react';
import arrow from '@/public/images/arrow.svg';

const PromoteCards = ({ children, className, imageSrc, imageClassName }) => {
    const containerClass = `curved-container p-[2rem] relative ${className || ''}`;
    const imgClass = `absolute   ${imageClassName || ''}`;

    return (
        <div className={containerClass}>
            {imageSrc && <img src={imageSrc} alt="Promotion" className={imgClass} />}
            <div className='absolute bottom-0 right-1 bg-denary rounded-lt-[10px] rounded-full flex items-center  md:h-[90px] md:w-[90px]'>
                <img src={arrow.src} alt="arrow" className='md:w-[40px] w-[40px] md:h-[40px] m-auto hover:rotate-[50deg] transition-transform duration-300'
                />
            </div>
            <div className='flex flex-col-reverse sm:flex-col justify-center h-full'>
                {children}
            </div>
            <span className='bg-[#FF0000] text-white px-[2rem] py-[0.3rem] rounded-tl-[20px] rounded-br-[20px] top-0 absolute left-0'>New</span>
            <p className=' absolute bottom-0 p-[1rem] '>Available until 12-01-2023</p>
        </div>
    )
}

export default PromoteCards;
