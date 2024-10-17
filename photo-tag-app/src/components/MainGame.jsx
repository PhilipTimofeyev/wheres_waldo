import { React, useState, useEffect, useRef } from 'react'
import Level from './Level';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'


function MainGame({startGame, level}) {
    const [finalTime, setFinalTime] = useState()
    const [endGame, setEndGame] = useState()
    const [startRound, setStartRound] = useState(false)
    const [found, setFound] = useState([])
    console.log(level)



  return (
    <div>
        <Score startGame={startGame} endGame={endGame}/>
        {!finalTime && <Timer startGame={startGame} setFinalTime={setFinalTime} endGame={endGame} />}
        <Level level={level} setFound={setFound} found={found} setEndGame={setEndGame}/>
    </div>
  )
}

export default MainGame
