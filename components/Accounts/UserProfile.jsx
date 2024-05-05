// UserProfile.js
import React from 'react';
import CircularProgressBar from './CircuarProgressBar';

const UserProfile = () => {
    return (

        <section className='flex gap-4 items-center'>
            <div className="radial-progress text-primary" style={{ "--value": "75", "--size": "6rem" }} role="progressbar">
                <img
                    className=" w-14 h-14 rounded-full object-cover"
                    src="https://via.placeholder.com/80"
                    alt="Avatar"
                />
            </div>
            <div>
                <h2 className='text-2xl text-black'>John Doe</h2>
                <p>Your profile is 75% complete</p>
                <p className='text-xl text-black'>Finish setup {'>'}</p>
            </div>
        </section>
    );
};

export default UserProfile;
