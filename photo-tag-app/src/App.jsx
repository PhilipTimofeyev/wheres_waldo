import { useState, useEffect } from 'react'
import './App.css'
import LevelThumbnails from './components/LevelThumbnails';

function App() {
  const [levels, setLevels] = useState();

  const API_LEVELS_URL = "https://wheres-waldo-philip-timofeyev-af6cdea7175a.herokuapp.com/api/pictures"

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(API_LEVELS_URL)
      ).json();

      setLevels(data);
    };
    dataFetch();
  }, []);

  function Welcome() {
    return (
      <>
        <h1>Welcome to Where's Waldo!</h1>
        <h2>Please select a level:</h2>
      </>
    )
  }
  
  return (
    <>
      <Welcome />
      {levels && <LevelThumbnails levels={levels}/>}
    </>
  )
}

export default App
