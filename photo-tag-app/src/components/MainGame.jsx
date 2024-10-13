import { React, useState } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

function MainGame() {

    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const [showCircle, setShowCircle] = useState(false); 
    const [screenSize, setScreenSize] = useState(0)

    const characters = [
        {id: 1, name:'Waldo'},
        {id: 2, name:'Bertha'},
        {id: 3, name: 'Rick'}
    ]

    function handleClick(e) {
        const coordX = e.clientX
        const coordY = e.clientY

        setMouseCoord([coordX, coordY])
        setScreenSize(e.view.parent.innerWidth * .015)
        setShowCircle(true)
        setShowDropdown(true)
    }

  return (
    <div>
        <img className={styles.gameImage} onClick={handleClick}
            src="./src/assets/images/wheres-waldo-beach.jpg"
        />

        {showDropdown &&
              <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: screenSize, height: screenSize }}><Dropdown characters={characters}/></div>}
        
        {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: screenSize, height: screenSize }}></div>}

    </div>
  )
}

export default MainGame
