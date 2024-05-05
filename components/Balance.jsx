"use client"
import React from 'react'
import nature from "@/public/images/nature.svg";
import map from "@/public/images/map.svg";
import system from "@/public/images/system.svg";
import { usePathname } from 'next/navigation';
import Icon from '@/Reusable/Icons/Icons'

const Balance = () => {
    const data = [
        {
            id: 1,
            title: 'Coming Up',
            image: nature,
            points: 50
        },
        {
            id: 2,
            title: 'Live Games',
            image: system,
            points: 50
        },
        {
            id: 3,
            title: 'Total Points Earned',
            image: map,
            points: 50
        }
    ]

    const isAccount = usePathname().includes('account')
    return (

        <div className='flex gap-4 p-[1rem]'>
            <figure className={` ${isAccount ? 'basis-[100%]' : 'basis-[40%]'} bg-[#F5F5F5] shadow-md text-black p-[1rem] rounded-[20px]`}>
                <aside className='flex items-center gap-5 p-[1rem]'>
                    <div className="avatar">
                        <div className="w-4 rounded-full ring ">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    <p> Total Balance</p>
                </aside>
                <aside className='flex justify-between p-[1rem]  text-white cursor-pointer'>
                    <p className='text-2xl text-black font-bold'>$100.00 USD</p>
                    {isAccount ?
                        <aside className='flex items-center gap-8'>
                            <div >
                                <h2 className='text-[#012C51] text-xl'>Funds Deposited</h2>
                                <p className='text-[#808080] text-2xl'>$75.000 USD</p>
                            </div>
                            <div>
                                <h2 className='text-[#012C51] text-xl'>Rewards Earned</h2>
                                <p className='text-[#808080] text-2xl'>$25.000 USD</p>
                            </div>
                        </aside> : <div className='bg-[#012C51] p-[1rem] px-[2rem] rounded-full flex gap-2'>
                                <Icon type="topup" /> Top up
                            </div>}

                </aside>
                <aside className='flex gap-4  py-[1rem]'>
                    {isAccount && <div className='flex'>
                        <aside className='flex justify-between p-[1rem]  text-white cursor-pointer'>
                            <div className='bg-[#012C51] p-[1rem] px-[2rem] rounded-full flex gap-2'>
                                <Icon type="topup" /> Top up
                            </div>
                        </aside>
                        <aside className='flex justify-between p-[1rem]  text-white cursor-pointer'>
                            <div className='bg-[#012C51] p-[1rem] px-[2rem] rounded-full flex gap-2'>
                                <Icon type="withdraw" /> Withdraw
                            </div>
                        </aside>
                    </div>
                    }
                    <div>
                        <p> last Spent</p>
                        <p className='text-xl font-bold mt-[1rem]'>January 4, 2023</p>
                    </div>
                    <div className='border-x-[1px] px-[1rem] border-gray-500'>
                        <p> last Spent</p>
                        <p className='text-xl font-bold mt-[1rem]'>January 4, 2023</p>
                    </div>
                    <div>
                        <p>Payment Method</p>
                        <p className='text-xl font-bold mt-[1rem]'>**** 0733</p>
                    </div>
                </aside>
            </figure>
            {!isAccount &&
                <figure className='flex items-center justify-around basis-[60%]'>
                    {data.map((item) => (
                        <div key={item.id} className=' text-black p-[1rem] '>
                            <aside className=' p-[1rem]'>
                                <img src={item.image.src} />
                                <p className='text-sm text-gray-500'> {item.title}</p>
                                <p className='font-bold '>{item.points}</p>
                            </aside>
                        </div>
                    ))}
                </figure>
            }
        </div>
    )
}

export default Balance
