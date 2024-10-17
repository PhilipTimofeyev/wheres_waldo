import { useState, useEffect } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'

function App() {
  const [startGame, setStartGame] = useState(false)
  const [allPictures, setAllPictures] = useState();
  const [selectedLevel, setSelectedLevel] = useState();

  function beginGame() {
    setStartGame(true)
  }

  useEffect(() => {
    const API_URL = "http://127.0.0.1:3000/api/pictures"

    const dataFetch = async () => {
      const data = await (
        await fetch(
          API_URL,
        )
      ).json();

      setAllPictures(data);
    };
    dataFetch();
  }, []);

  function showPictureThumbnails() {
    return (
      allPictures.map(picture =>
      <li key={picture.id}>
        <img
          onClick={() => selectLevel(picture)}
          src={picture.image}
        />
        <h3>{picture.title}</h3>
      </li>
    )
  )}

  function selectLevel(level) {
    setSelectedLevel(level)
    setStartGame(true)
  }
  

  return (
    <>
      {!startGame && <h1>Welcome to Where's Waldo!</h1>}
      {!startGame && <h2>Please select a level!</h2>}
      {!startGame && allPictures && showPictureThumbnails()}
      {startGame && <MainGame startGame={startGame} level={selectedLevel}/>}
    </>
  )
}

export default App
