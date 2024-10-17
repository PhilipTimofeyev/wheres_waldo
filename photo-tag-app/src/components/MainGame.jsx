import { React, useState, useEffect, useRef } from 'react'
import Level from './Level';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'


function MainGame({startGame, level}) {
    const [finalTime, setFinalTime] = useState()
    const [gameOver, setGameOver] = useState()
    const [startRound, setStartRound] = useState(false)
    const [found, setFound] = useState([])
    console.log(level)



  return (
    <div>
        <Score startGame={startGame} gameOver={gameOver}/>
        {!finalTime && <Timer startGame={startGame} setFinalTime={setFinalTime} gameOver={gameOver} />}
        <Level level={level} setFound={setFound} found={found} setGameOver={setGameOver}/>
    </div>
  )
}

export default MainGame
