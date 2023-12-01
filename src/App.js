
import { useEffect, useState } from "react"
import Die from "./Components/Die"
import{nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){

    const [dice, setDice]=useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)


    useEffect(()=>{
       const allSameValue = dice.every( die=>
        dice[0].value === die.value
        );
       const allHeld = dice.every(die=> die.isHeld)

       setTenzies(()=>
        allSameValue && allHeld? true: false
        )

    }, [dice])

//function that generate new dice to be use by the dice state
    function allNewDice(){
        const newDice = []
        for(let i=0; i<10; i++){
            
            newDice.push(generateNewDie())
        }
        return newDice;
    }


   
    function generateNewDie(){
        return {
            value: Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
        }
    }

// this setDice state back to defaut by generating new array
    const rollDice = ()=>{

        setDice((oldDice)=>{
            if (tenzies){
                return oldDice.map((die)=>{
                    return generateNewDie()
                }) 
            }else{
                return oldDice.map((die)=>{
                    return die.isHeld? die: generateNewDie()
                })
            }

        });
    }
    

    
const holdDice = (id)=>{
    setDice(oldDice => oldDice.map(die=> {
        return die.id === id ? {...die, isHeld:!die.isHeld} : die
    }))
 }

 


//mapping over the array inside the state (dice) and use it to generate a Die component 
    const diceElements = dice.map((die)=>{
        return <Die 
        value= {die.value} 
        key={die.id} 
        isHeld = {die.isHeld}
        holdDice = {()=>holdDice(die.id)}
        />
    })


   

    return (
     <main className="main">
        <div className="container">
        {tenzies && <Confetti/>}
            <div className="instruction">
                <h1>Tenzies</h1>
                <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="box-container">
                {diceElements}
            </div>
            <button 
            onClick={rollDice}
            className="roll-dice"
            >
            {tenzies? "New Game":"Roll"}</button>
        </div>
     </main>
    )
}


//improved this game by making it roll by itself making the user have less time to select
//after the user won the game set a counter that increase 
//by one the count will be multiply by the set timer which
//will automatically increase the roll speed making the
//user have lesser time to select. 
//repeat this process, give user score as they complete
//each level.