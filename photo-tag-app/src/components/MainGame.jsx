import { React, useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const API_URL = "http://127.0.0.1:3000/api/pictures/1"
const WINDOW_WIDTH = window.innerWidth
const WINDOW_HEIGHT = window.innerHeight
const SQUARE_SIZE = WINDOW_WIDTH * .015

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

        console.log(verifyCoord(e.clientX, e.clientY))
    }

    function verifyCoord(x, y) {
        console.log([x, y])
        console.log([data.characters[0].x_coord, data.characters[0].y_coord])

        const squareValidAreaX = (SQUARE_SIZE / 2) + 10
        const squareValidAreaY = (SQUARE_SIZE / 2) + 20

        const correctXCoord = data.characters[0].x_coord
        const correctYCoord = data.characters[0].y_coord

        return (x > (correctXCoord - squareValidAreaX) && x < (correctXCoord + squareValidAreaX)) &&
            (y > (correctYCoord - squareValidAreaY) && y < (correctYCoord + squareValidAreaY))
    }

  return (
    <div>
        {data && 
            <img className={styles.gameImage} onClick={handleClick}
            src={data.picture.image}
        />
        }
          <div>{data && <h1>{data.picture.title}</h1>}</div>
        {showDropdown &&
              <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: SQUARE_SIZE, height: SQUARE_SIZE }}><Dropdown characters={data.characters}/></div>}
        
          {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: SQUARE_SIZE, height: SQUARE_SIZE }}></div>}

    </div>
  )
}

export default MainGame
