import MainContent from '@/components/Accounts/MainContent'
import ProfileForm from '@/components/Accounts/Settings/ProfileForm'
import Sider from '@/components/Accounts/settings/Sider'
import React from 'react'

const page = () => {
    return (
        <section>
            <div className='flex gap-4 p-[1rem] justify-around bg-white'>
                <Sider />
                <ProfileForm />
            </div>
        </section>

    )
}

export default page
