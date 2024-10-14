import { React, useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const API_URL = "http://127.0.0.1:3000/api/pictures/1"
const SQUARE_SIZE = window.innerWidth * .015
const ORIGINAL_SCREEN_DIM_X = 2560 
const ORIGINAL_SCREEN_DIM_Y = 1328 

function MainGame() {
    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const [showCircle, setShowCircle] = useState(false); 
    const [data, setData] = useState();

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            setData(data);
        };
        dataFetch();
    }, []);

    function handleClick(e) {
        setMouseCoord([e.clientX, e.clientY])
        setShowCircle(true)
        setShowDropdown(true)
        const bounds = e.target.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top
        
        console.log(bounds)
        console.log([e.clientX, e.clientY])
        console.log([x, y])
        console.log(window.innerWidth)
        // console.log(e.clientX)
        // console.log(data.characters[0].x_coord)
        // console.log(data.characters[0].x_coord / window.innerWidth)
    }

    function normalizeCoord(character) {
        const x_perc = window.innerWidth / ORIGINAL_SCREEN_DIM_X
        const y_perc = window.innerHeight / ORIGINAL_SCREEN_DIM_Y

        const normalizedX = character.x_coord * x_perc
        const normalizedY = character.y_coord * y_perc

        return [normalizedX, normalizedY]
    }



    function handleSelection(e) {
        const bounds = e.target.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top

        // console.log(x, y)

        console.log(e.target.innerText === data.characters[0].name &&
            verifyCoord(x, y))
        return e.target.innerText === data.characters[0].name &&
            verifyCoord(mouseCoord[0], mouseCoord[1])
    }

    function verifyCoord(x, y) {
        // console.log([x, y])
        // console.log([data.characters[0].x_coord, data.characters[0].y_coord])

        const squareValidAreaX = (SQUARE_SIZE / 2) + 10
        const squareValidAreaY = (SQUARE_SIZE / 2) + 20

        const normalizedX = normalizeCoord(data.characters[0])[0]
        const normalizedY = normalizeCoord(data.characters[0])[1]

        console.log([normalizedX, normalizedY])

        return (x > (normalizedX - squareValidAreaX) && x < (normalizedX + squareValidAreaX)) &&
            (y > (normalizedY - squareValidAreaY) && y < (normalizedY + squareValidAreaY))
    }

  return (
    <div>
        {data && 
            <img className={styles.gameImage} onClick={handleClick}
            src={data.picture.image}
        />
        }
          <div>{data && <h1>{data.picture.title}</h1>}</div>
        {/* {showDropdown &&
              <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: SQUARE_SIZE, height: SQUARE_SIZE }}><Dropdown handleSelection = {handleSelection} characters={data.characters}/></div>} */}
        
          {/* {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: SQUARE_SIZE, height: SQUARE_SIZE }}></div>} */}

    </div>
  )
}

export default MainGame
