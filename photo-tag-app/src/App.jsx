import { useState } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'

function App() {
  const [startGame, setStartGame] = useState(false)

  function beginGame() {
    setStartGame(true)
  }

  return (
    <>
      <h1>Welcome to Where's Waldo!</h1>
      <button className='startBtn' onClick={beginGame}>Start Game</button>
      {startGame && <MainGame startGame={startGame}/>}
    </>
  )
}

export default App
