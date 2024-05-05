import React from 'react'
import { Modal, Progress } from 'antd';
import { CheckCircleFilled, CheckCircleOutlined } from '@ant-design/icons';

const AddressModal = () => {
    const profileData = [
        { label: 'Full Name', completed: true },
        { label: 'Email Address', completed: true },
        { label: 'Date Of Birth', completed: true },
        { label: 'Address', completed: false },
        { label: 'Mobile Number', completed: false },
    ];

    const completionRate = (profileData.filter(item => item.completed).length / profileData.length) * 100;

    return (
        <div className='w-full '>

            <div onClick={() => document.getElementById('my_modal_3').showModal()} className="flex items-center w-full border  rounded-full cursor-pointer w-full  bg-[#fff] p-[0.7rem] flex justify-center items-center">
                + Add Address
            </div>
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box bg-white">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="p-6 text-center bg-white">
                        <h2 className="text-xl font-semibold">Complete Your Profile</h2>
                        <p className="text-gray-500 text-sm">This helps validate the accuracy of personal information and security of this account</p>
                        <div className="my-4">
                            <Progress percent={completionRate} showInfo={false} strokeColor="#36C86F" trailColor="#D3D3D3" />
                        </div>
                        <ul className="text-left space-y-2">
                            {profileData.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {item.completed ? (
                                        <CheckCircleFilled className="text-green-500" />
                                    ) : (
                                        <CheckCircleOutlined className="text-gray-400" />
                                    )}
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full mt-4">
                            Complete profile
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddressModal
