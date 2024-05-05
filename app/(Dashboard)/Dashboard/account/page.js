import MainContent from '@/components/Accounts/MainContent'
import Sider from '@/components/Accounts/Sider'
import React from 'react'

const page = () => {
    return (
        <section>
            <div className='flex gap-4 p-[1rem] justify-around bg-white'>
                <Sider />
                <MainContent />
            </div>
        </section>

    )
}

export default page
