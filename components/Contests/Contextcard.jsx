import React from 'react';
import nbaball from '../../public/images/nbaball.svg';
import eplball from '../../public/images/eplball.svg';
import { usePathname } from 'next/navigation';

const typeStyles = {
    NBA: { image: nbaball.src, borderColor: '#FF6D00', bgColor: '#012C51' }, // Example values
    EPL: { image: eplball.src, borderColor: '#007BFF', bgColor: '#F0D12F' },
    // UFC: { image: ufclogo.src, borderColor: '#28A745', bgColor: '#F0213B' },
};


const Contextcard = ({ type = 'NBA', title }) => {
    const { borderColor } = typeStyles[type] || typeStyles['NBA'];
    const pathname = usePathname().includes('game');


    return (
        <div className='p-[1rem]'>
            <div className={`flex items-start justify-between text-gray-500 p-[1rem] bg-[#F9F9F9] shadow-md rounded-[10px] border-b-[5px]`} style={{ borderColor }}>
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
                    <button className='bg-[#012C51] px-[2rem] py-[0.6rem] rounded-full text-white'>
                        Enter contest for $1
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default Contextcard;
