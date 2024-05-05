import React from 'react'
import bannerImg from '@/public/images/bannerImg.svg'
import gift from '@/public/images/giftbox.png'
import Icon from '@/Reusable/Icons/Icons'

const RewardBanner = () => {
    return (
        <div className='flex relative border-top-[1px] py-[1.5rem]'>
            <aside className='w-4/5 relative h-[300px]'>
                <img src={bannerImg.src} alt='banner' className=' rounded-l-[20px] w-full z-20 relative' />
                <div className='absolute top-0 z-50 w-3/5 flex items-start px-[2rem] justify-center flex-col h-full text-white text-xl'>
                    <h2 className='text-2xl'>Earn Reward</h2>
                    <p className='my-[1rem]'>Refer a friend to Balldraft and earn a bonus of $15. For every friend you refer who registers for Balldraft, you’ll receive a $15  bonus</p>
                    <button className='text-white px-[3rem] py-[0.5rem] border-[1px] border-white rounded-full flex '>
                        view full details  <Icon type='arrowslant' />
                    </button>
                </div>
            </aside>
            <aside className='absolute right-0 top-0'>
                <img src={gift.src} alt="" className='w-350px h-[350px] ' />
            </aside>
        </div>
    )
}

export default RewardBanner
