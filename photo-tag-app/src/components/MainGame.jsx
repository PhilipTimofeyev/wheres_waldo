import { React, useState, useEffect, useRef, useContext } from 'react'
import Level from './Level';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'


function MainGame({startGame, level}) {
    const [gameOver, setGameOver] = useState()
    const [found, setFound] = useState([])



  return (
    <div>
        <Score startGame={startGame} gameOver={gameOver}/>
        <Level level={level} setFound={setFound} found={found} setGameOver={setGameOver}/>
        {<Timer startGame={startGame} gameOver={gameOver} />}
    </div>
  )
}

export default MainGame
