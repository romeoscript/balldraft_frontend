import React from 'react'
import Promotecards from './Promotecards'
import rocket from '@/public/images/rocket.png'
import trophy from '@/public/images/trophy.png'
import casino from '@/public/images/casino.png'

const Promotions = () => {
    return (
        <section className='md:h-screen max-md:mb-[3rem] bg-white'>
            <h2 className='text-center font-bold md:text-3xl text-black my-[2rem]'>Promotions</h2>

            <div className=' md:grid block md:grid-cols-2 md:p-[4rem] p-[1rem] gap-[4%] h-4/5'>
                <Promotecards imageSrc={rocket.src}
                    imageClassName="h-full absolute top-0 right-0 vibrate-1" className='md:h-full h-[400px]' >
                    <h2 className='md:text-5xl text-3xl font-bold text-black mb-[2rem]'>THE <p className='md:text-6xl'>LEVEL <br /> UP</p></h2>
                    <p className='md:text-5xl font-bold text-skyish'>$15, 000 </p>
                    <p className='text-black'>Prizes Every Week</p>
                </Promotecards >
                <div className='grid gap-[4%] h-full'>
                    <Promotecards imageSrc={trophy.src}
                        imageClassName="h-full absolute right-[10%] top-0 wobble-hor-bottom" className='md:h-full h-[400px] w-full' >
                        <h2 className='md:text-3xl font-bold text-black mb-[1rem] max-md:absolute top-20 z-100'>CASINO <p className='md:text-5xl text-2xl'> CHALLENGES</p></h2>
                        <p className='text-black max-md:absolute bottom-12 z-100'>Win <span className='text-skyish'>Big</span> Prizes Everyday</p>
                    </Promotecards >
                    <Promotecards imageSrc={casino.src}
                        imageClassName="h-full absolute top-0 right-[10%] heartbeat" className='md:h-full h-[400px] w-full' >
                        <h2 className='md:text-3xl font-bold text-black mb-[1rem] max-md:absolute top-20 z-100'>CASINO <p className='md:text-5xl text-2xl'>CHALLENGES</p></h2>
                        <p className='text-black max-md:absolute bottom-12 z-100'>Win <span className='text-skyish'>Big</span> Prizes Everyday</p>
                    </Promotecards >
                </div>
            </div>
        </section>
    )
}

export default Promotions
