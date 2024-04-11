"use client"
import React from 'react';
import { Tabs } from 'antd';
import Contests from './Contests';
import './MoreContext.css';

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Beginner Contests',
        children: <Contests type='recent' />,
    },
    {
        key: '2',
        label: 'Biggest Prizes',
        children: <Contests type='top' />,
    },
    {
        key: '3',
        label: 'Single Game',
        children: <Contests type='top' />,
    },
    {
        key: '4',
        label: 'Free Entry',
        children: <Contests type='top' />,
    },

];
const MoreContext = () => (

    <>
        <h2 className='text-2xl font-bold text-center my-[2rem] text-black'>More Contests</h2>
        <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            centered
        />
    </>

);

export default MoreContext;