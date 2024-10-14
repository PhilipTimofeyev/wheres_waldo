import { useState } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'
import Timer from './components/Timer';

function App() {
  const [startGame, setStartGame] = useState(false)

  return (
    <>
    <h1>Welcome to Where's Waldo!</h1>
    <Timer setStartGame={setStartGame} />
    {startGame && <MainGame/>}
    </>
  )
}

export default App
