import { useState } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'

function App() {
  const [startGame, setStartGame] = useState(false)

  const API_URL = "http://127.0.0.1:3000/api/pictures"

  function beginGame() {
    setStartGame(true)
  }

    const postBody = {
      title: 'test image'
    };

    async function postData() {
      const response = await fetch(API_URL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(postBody),
      });
      return response.json();
    }


  return (
    <>
      {!startGame && <h1>Welcome to Where's Waldo!</h1>}
      {!startGame && <button className='startBtn' onClick={beginGame}>Start Game</button>}
      {<button className='startBtn' onClick={postData}>Hmm</button>}
      {startGame && <MainGame startGame={startGame}/>}
    </>
  )
}

export default App
