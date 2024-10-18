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

  const API_PICTURES_URL = "http://127.0.0.1:3000/api/pictures"
  const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"

  useEffect(() => {

    const dataFetch = async () => {
      const data = await (
        await fetch(API_PICTURES_URL)
      ).json();

      setAllPictures(data);
    };
    dataFetch();
  }, []);

  function startLevel(level) {
    setSelectedLevel(level)
    setStartGame(true)
    createScore(level)
  }

  async function createScore(level) {
    const postBody = {
      username: 'Anonymous',
      picture_id: level.id
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

  function goHome() {
    setStartGame(false)
  }
  
  return (
    <>
    <Navbar goHome={goHome}/>
      {!startGame && <h1>Welcome to Where's Waldo!</h1>}
      {!startGame && <h2>Please select a level:</h2>}
      <div className='levelsGrid'>
        {!startGame && allPictures && <ShowPictureThumbnails allPictures={allPictures} startLevel={startLevel}/>}
      </div>
      <ScoreContext.Provider value={currentScore}>
        {startGame && <MainGame startGame={startGame} level={selectedLevel}/>}
      </ScoreContext.Provider>
    </>
  )
}

function ShowPictureThumbnails({allPictures, startLevel}) {
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
  )
}

function Navbar({goHome}) {
  return(
    <>
      <button onClick={goHome}>All Levels</button>
    </>
  )
}

export default App
