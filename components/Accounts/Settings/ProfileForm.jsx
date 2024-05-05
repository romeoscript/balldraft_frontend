// ProfileForm.js
"use client"
import Icon from '@/Reusable/Icons/Icons';
import React from 'react';
import AddressModal from './AddressModal';
import MobileModal from './MobileModal';


const ProfileForm = () => {
    return (
        <div className="p-6 rounded-lg w-[70%]">
            <div className='flex flex-col items-center gap-4 text-[#012C51] my-[2rem]'>
                <img
                    className=" w-20 h-20 rounded-full object-cover"
                    src="https://via.placeholder.com/80"
                    alt="Avatar"
                />
                Edit Profile
            </div>

            <div className="space-y-4 text-black">
                <div className="flex flex-col items-start">
                    <label className="w- font-medium">Full Name:</label>
                    <div className="flex items-center w-full border rounded-lg">
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="flex-grow p-2 bg-transparent focus:outline-none"
                        />
                        <button className="p-2 text-white bg-[#012C51] rounded-full flex gap-2">
                            <Icon type="edit" /> Edit
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label className="w-32 font-medium">Email Address:</label>
                    <div className="flex items-center w-full border rounded-full">
                        <input
                            type="email"
                            defaultValue="johndoe@yahoo.com"
                            className="flex-grow p-2 bg-transparent focus:outline-none"
                        />
                        <button className="p-2 text-white  bg-[#012C51] rounded-full flex gap-2">
                            <Icon type="edit" /> Change
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label className="w-32 font-medium">Date of Birth:</label>
                    <div className="flex items-center w-full border rounded-lg">
                        <input
                            type="date"
                            defaultValue="2002-11-05"
                            className="flex-grow p-2 bg-transparent focus:outline-none"
                        />
                        <button className="p-2 text-white  bg-[#012C51] rounded-full flex gap-2">
                            <Icon type="edit" /> Edit
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label className=" font-medium">Address Or Residence</label>
                    <AddressModal />
                   
                </div>
                <div className="flex flex-col items-start">
                    <label className="w-32 font-medium">Mobile Number</label>
                    <MobileModal />
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;
