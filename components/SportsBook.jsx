import SportsCard from '@/Reusable/SportsCard';
import React, { useState } from 'react';
import ghostbg from "@/public/images/ghostbg.svg";
import ghostball from "@/public/images/ghostball.svg";
import ufc from "@/public/images/UFC.svg";

const SportsBook = () => {
  const [filter, setFilter] = useState('all');

  // List of all sports cards
  const sportsCards = [
    { id: 1, type: 'NBA' },
    { id: 2, type: 'EPL' },
    { id: 3, type: 'UFC' },
    { id: 4, type: 'EPL' },
    { id: 5, type: 'UFC' },
    { id: 6, type: 'NBA' },
  ];

  const filteredSportsCards = sportsCards.filter(card => filter === 'all' || card.type === filter);

  const getButtonClass = (type) => {
    return `px-[1.5rem] py-[0.3rem] rounded-full m-1 ${filter === type ? 'bg-[#808080] text-white' : 'bg-gray-200 text-black'}`;
  };
  return (
    <section className='p-[1rem]'>
      <div className="flex gap-4 p-[1rem] my-[1rem] border-b-[2px]   ">
        <button className={getButtonClass('all')} onClick={() => setFilter('all')}>All</button>
        <button className={getButtonClass('EPL')} onClick={() => setFilter('EPL')}> EPL</button>
        <button className={getButtonClass('NBA')} onClick={() => setFilter('NBA')}>NBA</button>
        <button className={getButtonClass('UFC')} onClick={() => setFilter('UFC')}>UFC</button>
      </div>
      <div className='grid grid-cols-3 gap-4 p-[1rem] '>
        {filteredSportsCards.map(card => (
          <SportsCard key={card.id} type={card.type} />
        ))}
      </div>

      
    </section>
  )
}

export default SportsBook;
