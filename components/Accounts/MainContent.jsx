import React from 'react'
import Balance from '../Balance'
import TransactionTable from './TransactionTable'
import Referal from './referal'
import RewardBanner from './RewardBanner'

const MainContent = () => {
  return (
    <div>
      <Balance />
      <figure>
        <RewardBanner />
        <div className='flex text-black items-center justify-between p-[1rem]'>
          <h2 className='text-2xl'>Recent Transactions </h2> <p>See all</p>
        </div>
        <Referal />
        <TransactionTable />
      </figure>
    </div>
  )
}

export default MainContent
