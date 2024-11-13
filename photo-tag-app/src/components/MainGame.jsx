import { React, useState, useEffect, useRef, useContext } from 'react'
import Level from './Level';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'


// function MainGame({level}) {
//     // const [gameOver, setGameOver] = useState(false)
//     // const [found, setFound] = useState([])

//   return (
//     <div>
//         <Score gameOver={gameOver}/>
//         <Level level={level} setFound={setFound} found={found} setGameOver={setGameOver} gameOver={gameOver}/>
//         {/* {<Timer gameOver={gameOver} />} */}
//     </div>
//   )
// }

// export default MainGame
