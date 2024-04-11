"use client"
import React from 'react';
import { Tabs } from 'antd';
import Tabdata from './Tabdata';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Recent News',
    children: <Tabdata type='recent' />,
  },
  {
    key: '2',
    label: 'Top Stories',
    children: <Tabdata  type='top'/>,
  },
 
];
const SportsTabs = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default SportsTabs;