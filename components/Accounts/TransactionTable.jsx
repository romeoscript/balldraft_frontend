"use client";
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { formatDistanceToNow, parseISO } from 'date-fns';

const columns = [
    {
        title: 'TRANSACTION TYPE',
        dataIndex: 'type',
        key: 'type',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'TRANSACTION ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'AMOUNT',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => {
            const color = amount > 0 ? 'green' : 'red';
            return <span style={{ color }}>{amount > 0 ? `+${amount}` : amount}</span>;
        },
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
        render: (date) => formatDistanceToNow(parseISO(date), { addSuffix: true }),
    },
    {
        title: 'STATUS',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
            const color = status === 'success' ? 'green' : 'volcano';
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
    },
    
];

const data = [
    {
        key: '1',
        type: 'Payment',
        id: '12345',
        amount: 32,
        date: '2024-05-02T09:30:00Z',
        status: 'success',
    },
    {
        key: '2',
        type: 'Refund',
        id: '67890',
        amount: -42,
        date: '2024-05-04T11:00:00Z',
        status: 'failure',
    },
    {
        key: '3',
        type: 'Payment',
        id: '11223',
        amount: 50,
        date: '2024-05-05T15:15:00Z',
        status: 'success',
    },
];

const TransactionTable = () => <Table columns={columns} dataSource={data} />;
export default TransactionTable;
