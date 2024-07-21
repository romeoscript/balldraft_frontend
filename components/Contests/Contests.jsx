import React from 'react'
import Contextcard from './Contextcard'

const Contests = ({ contests }) => {

    return (
        <div>
            {
                contests?.map((contest) => (
                    <Contextcard contest={contest} type={contest.entry_type} key={contest.id} />
                ))
            }
        </div>
    )
}

export default Contests
