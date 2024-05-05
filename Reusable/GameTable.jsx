import React from 'react';

const GameTable = ({ type }) => {
  return (
    <div className='shadow-md rounded-lg p-4 w-72'>
      <div className='text-3xl text-black font-bold mb-4'>{`Content ${type}`}</div>
      <div className='flex justify-between'>
        <div className='text-gray-500'>8:30 PM | Today</div>
        <button className='bg-gray-700 p-2 rounded-full text-white' style={{ background: '#808980' }}>
          $15 Entry
        </button>
      </div>
    </div>
  );
};

export default GameTable;
