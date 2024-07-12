'use client'

import React from 'react';
import nbaball from '../../public/images/nbaball.svg';
import eplball from '../../public/images/eplball.svg';
import { usePathname, useRouter } from 'next/navigation';

const typeStyles = {
    NBA: { image: nbaball.src, borderColor: '#FF6D00', bgColor: '#012C51' }, // Example values
    EPL: { image: eplball.src, borderColor: '#007BFF', bgColor: '#F0D12F' },
    // UFC: { image: ufclogo.src, borderColor: '#28A745', bgColor: '#F0213B' },
};


const Contextcard = ({ type = 'NBA', title }) => {
    const { borderColor } = typeStyles[type] || typeStyles['NBA'];
    const pathname = usePathname().includes('game');
    const router = useRouter();


    return (
        <div className='p-[1rem]'>
            <div className={`lg:flex hidden items-start justify-between text-gray-500 p-[1rem] bg-[#F9F9F9] shadow-md rounded-[10px] border-b-[5px]`} style={{ borderColor }}>
                {!pathname && <aside className='flex items-center gap-4'>
                    <img src={nbaball.src} alt="" />
                    <div>
                        <h2 className='font-bold text-xl text-black'>{title}</h2> {/* Use the 'title' prop dynamically */}
                        <p>SIngle Game</p>
                    </div>
                </aside>}

                <aside>
                    <h2 className='font-bold text-xl text-black'>{title} Beginner Double Up ($1)</h2> {/* Use the 'title' prop dynamically */}
                    <p>8.00 PM</p>
                </aside>
                <aside className='font-bold text-xl text-black'>
                    <p>619 Of 1.2K Entries</p>
                </aside>
                {!pathname &&
                    <aside>
                        <h2 className='font-bold text-xl text-black'>$50,000</h2>
                        <p>Guranteed In Prize</p>
                    </aside>}
                <aside>
                    <button className='bg-[#012C51] px-[2rem] py-[0.6rem] rounded-full text-white' onClick={() => router.push('/Dashboard/contest')}>
                        Enter contest for $1
                    </button>
                </aside>
            </div>
                <div className='flex items-start justify-between lg:hidden text-gray-500 p-[1rem] bg-[#F9F9F9] shadow-md rounded-[10px] border-b-[5px]' style={{ borderColor }}>
                    <aside className='flex flex-col items-start gap-2'>
                        <h2 className='font-medium text-sm text-black'>{title} Beginner Double Up ($1)</h2>
                        <div className='flex items-center'>
                            <img src={nbaball.src} alt="" className='w-16 h-16'/>
                            <div>
                                <h2 className='font-bold text-2xl text-black'>{title}</h2> {/* Use the 'title' prop dynamically */}
                                <p className='text-lg'>Single Game</p>
                            </div>
                        </div>
                        <h2 className='font-bold text-lg text-black'>619 Of 1.2K Entries</h2>
                    </aside>
                <aside className='flex flex-col items-end justify-between gap-2' style={{ borderColor }}>
                    <aside className='flex items-center gap-2'>
                        <h2 className='font-bold text-xl text-[#012C51]'>$50,000</h2>
                        <span>Guaranteed In Prize</span>
                    </aside>
                        <button className='bg-[#012C51] p-[1.4rem] rounded-full text-white' onClick={() => router.push('Dashboard/contest')}>
                            Enter contest for $1
                        </button>
                        <span>8.00 PM</span>
                </aside>
                </div>
        </div>
    );
};

export default Contextcard;
