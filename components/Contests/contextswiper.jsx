import React, { useRef, useState } from 'react';
import cashbackimg from '../../public/images/cashback.svg';
import cashbackbg from '../../public/images/cashbackbg.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


import { Pagination, Autoplay } from 'swiper/modules';

export default function ContextSwiper() {
    return (
        <div className='my-[2rem]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"

            >
                <SwiperSlide>
                    <div className='flex items-center swiperimg h-[400px] relative rounded-[20px] p-[1rem] w-4/5 m-auto'  >
                        <img src={cashbackbg.src} className='absolute right-0 opacity-[20%] rounded-[20px] h-full w-full z-1' alt="" />
                        <aside className='basis-[45%] max-sm:basis-[100%] p-[2rem] relative z-100'>
                            <h2 className='text-4xl text-white w-[80%] mb-[1rem] max-[900px]:text-3xl'>Get <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>5%</span> Cashback On Your First Deposit Up to <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>$30</span></h2>
                            <button className='border-[1px] text-white border-white rounded-full p-[0.5rem]' >
                                Deposit Now
                            </button>
                        </aside>
                        <aside className='basis-[45%] relative z-100 max-sm:hidden'>
                           <img src={cashbackimg.src} alt="" />
                        </aside>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex items-center swiperimg h-[400px] relative rounded-[20px] p-[1rem] w-4/5 m-auto'  >
                        <img src={cashbackbg.src} className='absolute right-0 opacity-[20%] rounded-[20px] h-full w-full z-1' alt="" />
                        <aside className='basis-[45%] max-sm:basis-[100%] p-[2rem] relative z-100'>
                            <h2 className='text-4xl text-white w-[80%] mb-[1rem] max-[900px]:text-3xl'>Get <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>5%</span> Cashback On Your First Deposit Up to <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>$30</span></h2>
                            <button className='border-[1px] text-white border-white rounded-full p-[0.5rem]' >
                                Deposit Now
                            </button>
                        </aside>
                        <aside className='basis-[45%] relative z-100 max-sm:hidden'>
                           <img src={cashbackimg.src} alt="" />
                        </aside>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex items-center swiperimg h-[400px] relative rounded-[20px] p-[1rem] w-4/5 m-auto'  >
                        <img src={cashbackbg.src} className='absolute right-0 opacity-[20%] rounded-[20px] h-full w-full z-1' alt="" />
                        <aside className='basis-[45%] max-sm:basis-[100%] p-[2rem] relative z-100'>
                            <h2 className='text-4xl text-white w-[80%] mb-[1rem] max-[900px]:text-3xl'>Get <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>5%</span> Cashback On Your First Deposit Up to <span className='text-[#FFD700] text-5xl max-[900px]:text-4xl'>$30</span></h2>
                            <button className='border-[1px] text-white border-white rounded-full p-[0.5rem]' >
                                Deposit Now
                            </button>
                        </aside>
                        <aside className='basis-[45%] relative z-100 max-sm:hidden'>
                           <img src={cashbackimg.src} alt="" />
                        </aside>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
