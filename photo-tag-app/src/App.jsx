import { useState, useEffect, createContext } from 'react'
import './App.css'
import './components/MainGame'
import MainGame from './components/MainGame'
export const ScoreContext = createContext()

function App() {
  const [startGame, setStartGame] = useState(false)
  const [allPictures, setAllPictures] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [currentScore, setCurrentScore] = useState()

  const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"

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
            <div className='levelTiles'>
            <img
              onClick={() => startLevel(picture)}
              src={picture.image}
            />
            <h3>{picture.title}</h3>
      </div>
          </li>
    )
  )}

  function startLevel(level) {
    setSelectedLevel(level)
    setStartGame(true)
    createScore()
  }

  async function createScore() {
    const postBody = {
      username: 'test score',
      picture_id: 1
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    };

    try {
      const response = await fetch(API_SCORE_URL, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setCurrentScore(responseData)
    } catch (error) {
      console.error('Error:', error);
    }
  } 
  

  return (
    <>
      {!startGame && <h1>Welcome to Where's Waldo!</h1>}
      {!startGame && <h2>Please select a level:</h2>}
      <div className='levelsGrid'>
        {!startGame && allPictures && showPictureThumbnails()}
      </div>
      <ScoreContext.Provider value={currentScore}>
        {startGame && <MainGame startGame={startGame} level={selectedLevel}/>}
      </ScoreContext.Provider>
    </>
  )
}

export default App
