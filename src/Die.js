
import React from 'react';

export default function Die(props) {
    const styled = {
        backgroundColor: props.held ? '#59E391' : 'white'
    }

    return (
        <div 
            className='die-face' 
            style={styled} 
            onClick={props.holdDice}
        >
            <h1 className='die-num'>{props.value}</h1>
        </div>
    )
}
