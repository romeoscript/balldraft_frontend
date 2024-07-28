'use client'

import React, { useCallback, useMemo, useState } from 'react';
import nbaball from '../../public/images/nbaball.svg';
import eplball from '../../public/images/eplball.svg';
import { usePathname, useRouter } from 'next/navigation';
import pokemon from 'pokemon'


const typeStyles = {
    single: { image: nbaball.src, borderColor: '#FF6D00', bgColor: '#012C51' }, // Example values
    multiple: { image: eplball.src, borderColor: '#007BFF', bgColor: '#F0D12F' },
};

const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  let hours = date.getUTCHours(); // Get the hours in UTC
  const minutes = date.getUTCMinutes(); // Get the minutes in UTC
  const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const strMinutes = minutes < 10 ? '0' + minutes : minutes; // Pad minutes with leading zero if needed
  const strTime = hours + ':' + strMinutes + ' ' + ampm;

  return strTime;
};

const generateRandomName = (dateTimeString) => {
  // Generate a random time in the format "2PM"
  const hours = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const ampm = Math.random() > 0.5 ? 'AM' : 'PM'; // Randomly choose AM or PM
  const time = `${hours}${ampm}`;

const name = pokemon.random(); 
  return `${time} ${name}`;
};

const Contextcard = ({ type, contest }) => {
    const { borderColor } = typeStyles[type] || typeStyles['single'];
    const pathname = usePathname().includes('game');
    const router = useRouter();
    const [contestName, setcontestName] = useState(generateRandomName(contest?.date))

    return (
        <div className='p-[1rem]'>
            <div className={`lg:flex hidden items-start justify-between text-gray-500 p-[1rem] bg-[#F9F9F9] shadow-md rounded-[10px] border-b-[5px]`} style={{ borderColor }}>
                {!pathname && <aside className='flex items-center gap-4'>
                    <img src={nbaball.src} alt="" />
                    <div>
                        <h2 className='font-bold text-xl text-black'>{contestName}</h2> {/* Use the 'title' prop dynamically */}
                        <p>Single Game</p>
                    </div>
                </aside>}

                <aside>
                    <h2 className='font-bold text-xl text-black'>{contestName}</h2> {/* Use the 'title' prop dynamically */}
                    <p>{formatTime(contest.date)}</p>
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
                    <button className='bg-[#012C51] px-[2rem] py-[0.6rem] rounded-full text-white' onClick={() => router.push(`/Dashboard/contest/${contest?.id}`)}>
                        Enter contest for $1
                    </button>
                </aside>
            </div>
                <div className='flex items-start justify-between lg:hidden text-gray-500 p-[1rem] bg-[#F9F9F9] shadow-md rounded-[10px] border-b-[5px]' style={{ borderColor }}>
                    <aside className='flex flex-col items-start gap-2 justify-start'>
                        <div>
                            <h2 className='font-medium text-sm text-black'>{contest.title} Beginner Double Up ($1)</h2>
                        </div>
                            <div className='flex items-center'>
                            <img src={nbaball.src} alt="" className='w-18 h-16'/>
                            <span>
                                <h2 className='font-bold text-2xl text-black'>{contest.title}</h2> {/* Use the 'title' prop dynamically */}
                                <p className='text-lg'>Single Game</p>
                            </span>
                        </div>
                        <div>
                            <h2 className='font-bold text-lg text-black'>619 Of 1.2K Entries</h2>
                        </div>
                    </aside>
                <aside className='flex flex-col items-end justify-between gap-2' style={{ borderColor }}>
                    <aside className='flex items-center gap-2'>
                        <h2 className='font-bold text-lg text-[#012C51]'>$50,000</h2>
                        <span>Guaranteed In Prize</span>
                    </aside>
                        <button className='bg-[#012C51] p-[1.4rem] rounded-full text-white' onClick={() => router.push(`/Dashboard/contest/${contest?.id}`)}>
                            Enter contest for $1
                        </button>
                        <span>8.00 PM</span>
                </aside>
                </div>
        </div>
    );
};

export default Contextcard;
