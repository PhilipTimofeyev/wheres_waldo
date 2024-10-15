import { React, useState, useEffect, useRef } from 'react'
import Timer from './Timer';
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const API_URL = "http://127.0.0.1:3000/api/pictures/1"
const SQUARE_SIZE = .015

function MainGame({startGame}) {
    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const [data, setData] = useState();
    const [found, setFound] = useState([])
    const [finalTime, setFinalTime] = useState()
    const [endGame, setEndGame] = useState()
    const bounds = useRef()
    

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
        showDropdown ? setShowDropdown(false) : setShowDropdown(true)
        bounds.current = e.target.getBoundingClientRect()
    }

    function normalizeCharCoord(character) {
        // calculates ratio of character position relative to the image size
        const x_perc = character.x_coord / data.picture.image_width
        const y_perc = character.y_coord / data.picture.image_height

        const x = bounds.current.width * x_perc
        const y = bounds.current.height * y_perc

        const charCoord = { charX: x, charY: y }

        return charCoord
    }

    function normalizedUserCoord() {
        // calculates the mouse position relative to the image
        const x = mouseCoord[0] - bounds.current.left
        const y = mouseCoord[1] - bounds.current.top

        const userCoord = { userX: x, userY: y }

        return userCoord
    }


    useEffect(() => {
        gameOver()
    }, [found]);

    function handleSelection(e) {
        const charName = e.target.innerText
        const charObj = data.characters.find(char => char.name === charName)

        const userCoord = normalizedUserCoord()
        const charCoord = normalizeCharCoord(charObj)
        
        // console.log(verifyCoord(userCoord, charCoord))
        if (verifyCoord(userCoord, charCoord)) {
            setFound([
                ...found, { name: charObj.name, id: charObj.id, x_coord: mouseCoord[0], y_coord: mouseCoord[1] }
            ])
        }
    }

    function gameOver() {
        let allFound
        if (data) {
             allFound = data.characters.length === found.length
        }

        if (allFound) setEndGame(true)
    }

    function verifyCoord(userCoord, charCoord) {
        const {userX, userY} = userCoord
        const {charX, charY} = charCoord

        const squareValidAreaX = (bounds.current.width * SQUARE_SIZE / 2)
        const squareValidAreaY = (bounds.current.width * SQUARE_SIZE / 2) + 10

        return (userX > (charX - squareValidAreaX) && userX < (charX + squareValidAreaX)) &&
                (userY > (charY - squareValidAreaY) && userY < (charY + squareValidAreaY))
    }
    
    function picture() {
        return (
            <img className={styles.gameImage} onClick={handleClick} src={data.picture.image} />
        )
    }

    function dropdown() {
        return (
            <div className={styles.dropdown} style={{ left: mouseCoord[0], top: mouseCoord[1] }}><Dropdown handleSelection={handleSelection} characters={data.characters} bounds={bounds.current} found={found} /></div>
        )
    }

    function squareMarker() {
        return (
            <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}></div>
        )
    }

    const foundChars = found.map(char => {
        return < div key={char.id} className={styles.foundSquare} style={{ left: char.x_coord, top: char.y_coord, width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}></div >
    })


  return (
    <div>
        <Timer startGame={startGame} setFinalTime={setFinalTime} endGame={endGame} />
        {finalTime && <h2>You did it in {finalTime} seconds!</h2>}
        {data && picture()}
        {showDropdown && dropdown()}
        {showDropdown && squareMarker()}
        {found && foundChars}
    </div>
  )
}

export default MainGame
