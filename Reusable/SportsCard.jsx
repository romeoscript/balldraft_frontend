import React from 'react'
import ghostbg from "@/public/images/ghostbg.svg";
import ghostball from "@/public/images/ghostball.svg";
import ufc from "@/public/images/UFC.svg";

const sportsColors = {
  NBA: '#FF6D00',
  EPL: '#007BFF',
  UFC: '#28A745', 
};
const sportsImages = {
    NBA: ghostbg,
    EPL: ghostball,
    UFC: ufc,
  };
const SportsCard = ({ type }) => {
    // Determine the background color based on the type
    const bgColor = sportsColors[type] || 'gray';
    const sportImage = sportsImages[type] || ghostbg; 

    return (
        <div className='shadow-md rounded-[20px] p-[1rem] w-[350px] relative' style={{ width: '450px' }}>
            <div className='absolute top-0 left-0 text-white text-sm rounded-tl-[20px] rounded-br-[20px] px-[1.3rem]' style={{background: bgColor, padding:'0.2rem 1rem'}}>
                619 Of 1.2K Entries
            </div>
            <div className='flex mt-[1rem] rounded-tl-sm'>
                <h2 className='text-3xl text-black font-bold'>{type}</h2>
                <img src={sportImage.src} alt={`${type} image`} />
            </div>
            <div className='flex gap-8'>
                <p className='px-[2rem] py-[0.5rem] border-black border-[1px] rounded-full flex items-center justify-center text-gray-500'> $15, 000 - $3K To 1st</p>
                <aside className='flex items-center gap-2'>
                    <p className='w-[30px] bg-gray-500 rounded-full flex items-center justify-center' style={{ width: '30px', height: '30px' }}>G</p>
                    <p className='redis rounded-full flex items-center justify-center' style={{ width: '30px', height: '30px' }}>M</p>
                </aside>
            </div>
            <div className='flex items-center my-[1rem] justify-between'>
                <aside>
                    8:30 PM | Today
                </aside>
                <button className='bg-[#808080] p-[0.5rem] rounded-full text-white' style={{ background: '#808980' }}>
                    $15 Entry
                </button>
            </div>
        </div>
    )
}

export default SportsCard
