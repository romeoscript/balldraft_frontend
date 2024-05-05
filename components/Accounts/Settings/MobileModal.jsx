import React from 'react'
import { Select, Input, Checkbox, Button } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

const MobileModal = () => {
    const profileData = [
        { label: 'Full Name', completed: true },
        { label: 'Email Address', completed: true },
        { label: 'Date Of Birth', completed: true },
        { label: 'Address', completed: false },
        { label: 'Mobile Number', completed: false },
    ];


    return (
        <div className='w-full'>
            <div onClick={() => document.getElementById('my_modal_4').showModal()} className="flex items-center w-full border  rounded-full cursor-pointer w-full  bg-[#fff] p-[0.7rem] flex justify-center items-center">
                + Add Mobile number
            </div>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box bg-white">
                    <form method="dialog">

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="p-6">
                        <h2 className='text-2xl'>Add Residential Address</h2>
                        <p className="text-gray-500">This helps us to mail tax forms. Please ensure its up to date</p>
                        <form className="space-y-4 mt-4">
                            <Select className="w-full" placeholder="Select country">
                                <Select.Option value="usa">USA</Select.Option>
                                <Select.Option value="canada">Canada</Select.Option>
                            </Select>
                            <Select className="w-full" placeholder="Select state">
                                <Select.Option value="ny">New York</Select.Option>
                                <Select.Option value="ca">California</Select.Option>
                            </Select>
                            <Input placeholder="Address" />
                            <Input placeholder="City" />
                            <Input placeholder="ZIP code" />
                            <Checkbox>I confirm this information is correct</Checkbox>
                            <Button type="primary" className="w-full bg-[#012C51] rounded-full py-[1rem] flex items-center justify-center">Add address</Button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default MobileModal
