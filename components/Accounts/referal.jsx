"use client"
import React from 'react';
import logo from '@/public/images/logo.png';
import Icon from '@/Reusable/Icons/Icons';

const Referal = () => {
    const referralLink = 'https://referral-balldraft-com/bonus?...';
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                alert('Referral link copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    };

    return (
        <div className='m-[1rem] flex items-center gap-4'>
            <img src={logo.src} className='w-40' alt="Logo" />
            <div className='border-[3px] border-[#F9F9F9] rounded-[10px] relative input bg-white bordered-input w-full flex items-center p-[0.5rem]'>
                <input
                    type="text"
                    value={referralLink}
                    className="text-black bg-white border-none w-full outline-none focus-none"
                    readOnly
                />
                <div
                    className='bg-[#012C51] flex items-center gap-2 p-[0.5rem] rounded-full absolute top-0 right-0 cursor-pointer text-white'
                    onClick={copyToClipboard}
                >
                    <Icon type="copylink" />
                    Copy referral link
                </div>
            </div>
        </div>
    );
};

export default Referal;
