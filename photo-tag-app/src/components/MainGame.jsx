import { React, useState } from 'react'
import styles from './MainGame.module.css'

function MainGame() {

    const [mouseCoord, setMouseCoord] = useState()
    const [showCircle, setShowCircle] = useState(false); 
    const [screenSize, setScreenSize] = useState(0)

    function handleClick(e) {
        const coordX = e.clientX
        const coordY = e.clientY

        setMouseCoord([coordX, coordY])
        setScreenSize(e.view.parent.innerWidth * .015)
        setShowCircle(true)
    }

  return (
    <div>
          <img className={styles.gameImage} onClick={handleClick}
              src="./src/assets/images/wheres-waldo-beach.jpg"
          />

          {/* {console.log(mouseCoord[0])} */}

          {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: screenSize, height: screenSize }}></div>}

    </div>
  )
}

export default MainGame
