import React, { useState } from 'react';
import GameTable from '@/Reusable/GameTable';

const Games = () => {
  const [filter, setFilter] = useState('all');

  const filteredGameTable = getFilteredGameTable(filter);

  function getFilteredGameTable(filter) {
    // Logic to filter game table based on the selected filter
    // For now, returning a static array, replace with actual logic
    return [];
  }

  return (
    <section className='p-[1rem]'>
      <div className="flex gap-4 p-[1rem] my-[1rem] border-b-[2px]">
        <FilterButton filter="all" setFilter={setFilter}>All</FilterButton>
        <FilterButton filter="EPL" setFilter={setFilter}>EPL</FilterButton>
        <FilterButton filter="NBA" setFilter={setFilter}>NBA</FilterButton>
        <FilterButton filter="UFC" setFilter={setFilter}>UFC</FilterButton>
      </div>
      <div className='grid grid-cols-3 gap-4 p-[1rem] '>
        {filteredGameTable.map(card => (
          <GameTable key={card.id} type={card.type} />
        ))}
      </div>
    </section>
  );
};

const FilterButton = ({ filter, setFilter, children }) => {
  const handleClick = () => {
    setFilter(filter);
  };

  return (
    <button className="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Games;
