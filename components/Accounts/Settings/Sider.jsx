import React from 'react'
import Icon from '@/Reusable/Icons/Icons'

const Sider = () => {
    return (
        <div className='border-r-[1px] border-gray p-[1rem]'>
            <div className='flex flex-col gap-20 justify-between'>
                <ul className='text-sm'>
                    <li className='flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md'> <Icon type="profile" /> Profile</li>
                    <li className='flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md'><Icon type="emailChange" />Change Email</li>
                    <li className='flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md'><Icon type="passwordChange" />Change Password</li>
                    <li className='flex items-center gap-3 text-[#012C51] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md'><Icon type="twofactor" />2-Factor Authentication</li>
                    <li className='flex items-center gap-3 text-[#FF0000] py-[0.5rem] hover:text-white hover:bg-[#012c51] rounded-md'><Icon type="deactivate" />Deativate Account</li>
                </ul>
            </div>
            
        </div>
    )
}

export default Sider
