import { useState } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'
import Timer from './components/Timer';

function App() {
  const [startGame, setStartGame] = useState(false)
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  

  return (
    <>
      <h1>Welcome to Where's Waldo!</h1>
      <Timer setStartGame={setStartGame} isRunning={isRunning} setIsRunning={setIsRunning} seconds={seconds} setSeconds={setSeconds} />
      {startGame && <MainGame setIsRunning={setIsRunning} seconds={seconds}/>}
    </>
  )
}

export default App
