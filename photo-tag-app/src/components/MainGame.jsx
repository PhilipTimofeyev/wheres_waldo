import { React, useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const API_URL = "http://127.0.0.1:3000/api/pictures/1"
const SQUARE_SIZE = .015

function MainGame() {
    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const [bounds, setBounds] = useState();
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
        setBounds(e.target.getBoundingClientRect())
    }

    function normalizeCharCoord(character) {
        // calculates ratio of character position relative to the image size
        const x_perc = character.x_coord / data.picture.image_width
        const y_perc = character.y_coord / data.picture.image_height

        const x = bounds.width * x_perc
        const y = bounds.height * y_perc

        const charCoord = { charX: x, charY: y }

        return charCoord
    }

    function normalizedUserCoord() {
        // calculates the mouse position relative to the image
        const x = mouseCoord[0] - bounds.left
        const y = mouseCoord[1] - bounds.top

        const userCoord = { userX: x, userY: y }

        return userCoord
    }

    function handleSelection(e) {
        const charName = e.target.innerText
        const charObj = data.characters.find(char => char.name === charName)

        const userCoord = normalizedUserCoord()
        const charCoord = normalizeCharCoord(charObj)
        
         console.log(verifyCoord(userCoord, charCoord))
        return verifyCoord(userCoord, charCoord)
    }

    function verifyCoord(userCoord, charCoord) {
        const {userX, userY} = userCoord
        const {charX, charY} = charCoord

        const squareValidAreaX = (bounds.width * SQUARE_SIZE / 2)
        const squareValidAreaY = (bounds.width * SQUARE_SIZE / 2) + 10

        console.log(squareValidAreaX)

        return (userX > (charX - squareValidAreaX) && userX < (charX + squareValidAreaX)) &&
            (userY > (charY - squareValidAreaY) && userY < (charY + squareValidAreaY))
    }

    // console.log(bounds)

  return (
    <div>
        {data && 
            <img className={styles.gameImage} onClick={handleClick}
            src={data.picture.image}
        />
        }
          <div>{data && <h1>{data.picture.title}</h1>}</div>
        {showDropdown &&
              <div className={styles.dropdown} style={{ left: mouseCoord[0], top: mouseCoord[1] }}><Dropdown handleSelection = {handleSelection} characters={data.characters} bounds = {bounds}/></div>}
        
          {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: bounds.width * SQUARE_SIZE, height: bounds.width * SQUARE_SIZE, borderWidth: bounds.width * .003 }}></div>}

    </div>
  )
}

export default MainGame
