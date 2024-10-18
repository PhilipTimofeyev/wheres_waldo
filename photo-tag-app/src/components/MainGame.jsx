import { React, useState, useEffect, useRef, useContext } from 'react'
import Level from './Level';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'


function MainGame({startGame, level}) {
    const [finalTime, setFinalTime] = useState()
    const [gameOver, setGameOver] = useState()
    const [found, setFound] = useState([])



  return (
    <div>
        <Score startGame={startGame} gameOver={gameOver}/>
        <Level level={level} setFound={setFound} found={found} setGameOver={setGameOver}/>
        {!finalTime && <Timer startGame={startGame} setFinalTime={setFinalTime} gameOver={gameOver} />}
    </div>
  )
}

export default MainGame
