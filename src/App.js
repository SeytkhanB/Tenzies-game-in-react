
import {useState} from 'react';
import './style.css';
import Die from './Die';
import {nanoid} from 'nanoid';

export default function App() {
    const [dice, setDice] = useState(allNewDice())

    function allNewDice() {
        const newDice = [];
        for(let i = 0; i < 15; i++) {
            // newDice.push(Math.ceil(Math.random() * 7))
            newDice.push({
                value: Math.ceil(Math.random() * 7),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function holdDice(id) {
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            held={die.isHeld} 

            holdDice={() => holdDice(die.id)} // () => ananymous function 
        />
    ))

    function rollDice() {
        setDice(allNewDice())
    }

    return (
        <main>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button className='roll-btn' onClick={rollDice}>Roll</button>
        </main>
    )
}
