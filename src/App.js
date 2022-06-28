
import {useState, useEffect} from 'react';
import './style.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld) // this gives us true if all dice held
        const firstValue = dice[0].value // this gives us the held value
        const allSameValue = dice.every(die => die.value === firstValue) // checking if the value the same
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 7),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = [];
        for(let i = 0; i < 15; i++) {
            // newDice.push(Math.ceil(Math.random() * 7))
            newDice.push(generateNewDice())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(prevDice => prevDice.map(die => {
                return die.isHeld ?
                    die : 
                    generateNewDice()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
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
            tenzies={tenzies}

            holdDice={() => holdDice(die.id)} // () => ananymous function 
        />
    ))

    function reSet() {
        setDice(allNewDice())
        setTenzies(false)
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>
                Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.
            </p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button 
                className='roll-btn' 
                onClick={rollDice}
            >
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}
