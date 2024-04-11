import React from 'react';
import ExploreLayout from './ExploreLayout';
import phone from '@/public/images/phone.svg';
import logo from '@/public/images/logo.png'

const FantasyDraft = () => {
    return (
        <ExploreLayout>
        
            <div className='md:flex items-center h-full relative' data-aos="fade-up" data-aos-delay="300" data-aos-duration="4000">
                <div className='text-left md:w-3/5 md:p-[3rem] p-[1rem]'>
                    <img src={logo.src} className='md:w-[200px] w-[70px]' alt="" />
                    <h2 className='font-bold md:text-4xl  md:mb-[1rem] text-white '>FANTASY DRAFT</h2>
                    <p className='md:text-xl text-sm'>Kickoff on an even playing field with the Fantasy Draft feature. This enables you to compete against friends or players worldwide by picking your team from a common group of players...</p>
                    <button className='block my-[2rem] border-[1px] border-white py-[0.5rem] px-[2rem] rounded-[20px]'>
                        Explore Feature
                    </button>
                </div>
                <div className='absolute bottom-0 md:right-[5%] slide-up-animation'>
                    <img src={phone.src} className='md:w-full w-[70%] m-auto' alt="Fantasy Draft"   />
                </div>
            </div>
        </ExploreLayout>
    );
};

export default FantasyDraft;
