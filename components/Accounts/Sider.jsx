import React from 'react'
import UserProfile from './UserProfile'
import Icon from '@/Reusable/Icons/Icons'

const Sider = () => {
    return (
        <div className='border-r-[1px] border-gray p-[1rem]'>
            <div>
                <UserProfile />
                <ul>
                    <li className='flex items-center gap-3 text-[#012C51]'> <Icon type="tickets" /> Tickets</li>
                    <li className='flex items-center gap-3 text-[#012C51]'><Icon type="log" />Activity Log</li>
                    <li className='flex items-center gap-3 text-[#012C51]'><Icon type="game" />Responsible Gambling</li>
                    <li className='flex items-center gap-3 text-[#012C51]'><Icon type="history" />Transaction History</li>
                    <li className='flex items-center gap-3 text-[#012C51]'><Icon type="tax" />Taxing & Forms</li>
                    <li className='flex items-center gap-3 text-[#ff0000]'><Icon type="logout" />Sign Out</li>
                </ul>
            </div>
            <div className='flex items-center gap-4 text-[#012C51]'>
                <img
                    className=" w-14 h-14 rounded-full object-cover"
                    src="https://via.placeholder.com/80"
                    alt="Avatar"
                />
                Account Settings
            </div>
        </div>
    )
}

export default Sider
