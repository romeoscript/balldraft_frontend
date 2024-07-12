import React from 'react'
import Contextcard from './Contextcard'

const contests = [
    {
        type: 'NBA',
        title: 'NBA'
    },
    {
        type: 'NBA',
        title: 'NBA'
    },
    {
        type: 'EPL',
        title: 'EPL'
    },
    {
        type: 'EPL',
        title: 'EPL'
    },
    {
        type: 'NBA',
        title: 'NBA'
    },
]

const Contests = () => {
    return (
        <div>
            {
                contests?.map((contest) => (
                    <Contextcard type={contest?.type} title={contest?.title} />
                ))
            }
        </div>
    )
}

export default Contests
