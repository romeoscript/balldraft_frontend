import React from 'react'
import Contextcard from './Contextcard'

const Contests = () => {
    return (
        <div>
            <Contextcard type="NBA" />
            <Contextcard />
            <Contextcard type="EPL" />
            <Contextcard type="EPL" />
            <Contextcard />
        </div>
    )
}

export default Contests
