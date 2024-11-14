import { React, useState, useEffect, useRef } from 'react'
import { useParams, Link } from "react-router-dom";
import Dropdown from './Dropdown';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'

const SQUARE_SIZE = .015

function Level() {
    const [level, setLevel] = useState();
    const [characters, setCharacters] = useState();
    const [gameOver, setGameOver] = useState(false)
    const [found, setFound] = useState([])
    const [showDropdown, setShowDropdown] = useState(false); 
    const mouseCoord = useRef()
    const { levelID } = useParams();
    const bounds = useRef()

    useEffect(() => {
        const API_URL = `http://127.0.0.1:3000/api/pictures/${levelID}`
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            setLevel(data);
        };
        dataFetch();
    }, []);

    useEffect(() => {
        const API_URL = `http://127.0.0.1:3000/api/characters/${levelID}`
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            setCharacters(data);
        };
        dataFetch();
    }, [level]);

    function handleClick(e) {
        if (!gameOver) {
            mouseCoord.current = ([e.clientX, e.clientY])
            showDropdown ? setShowDropdown(false) : setShowDropdown(true)
            // Set bounds to establish proportion of image
            bounds.current = e.target.getBoundingClientRect()
        }
    }

    function normalizeCharCoord(character) {
        // calculates ratio of character position relative to the image size
        const x_perc = character.x_coord / level.picture.image_width
        const y_perc = character.y_coord / level.picture.image_height

        const x = bounds.current.width * x_perc
        const y = bounds.current.height * y_perc

        const charCoord = { charX: x, charY: y }

        return charCoord
    }

    function normalizedUserCoord() {
        // calculates the mouse position relative to the image
        const x = mouseCoord.current[0] - bounds.current.left
        const y = mouseCoord.current[1] - bounds.current.top

        const userCoord = { userX: x, userY: y }

        return userCoord
    }

    function handleSelection(e) {
        const charName = e.target.innerText
        const charObj = level.characters.find(char => char.name === charName)

        const userCoord = normalizedUserCoord()
        const charCoord = normalizeCharCoord(charObj)

        // console.log(verifyCoord(userCoord, charCoord))
        if (verifyCoord(userCoord, charCoord)) {
            setFound([
                ...found, { name: charObj.name, id: charObj.id, x_coord: mouseCoord.current[0], y_coord: mouseCoord.current[1] }
            ])
        }
    }

    function verifyCoord(userCoord, charCoord) {
        const { userX, userY } = userCoord
        const { charX, charY } = charCoord

        const squareValidAreaX = (bounds.current.width * SQUARE_SIZE / 2)
        const squareValidAreaY = (bounds.current.width * SQUARE_SIZE / 2) + 10

        return (userX > (charX - squareValidAreaX) && userX < (charX + squareValidAreaX)) &&
            (userY > (charY - squareValidAreaY) && userY < (charY + squareValidAreaY))
    }

    useEffect(() => {
        function endGame() {
            let allFound
            if (level) {
                allFound = level.characters.length === found.length
            }
            if (allFound) {
                setGameOver(true)
                setShowDropdown(false)
            }
        }
        
        endGame()
    }, [found]);

  return (
    <>
        <Link to='/'>Select A Different Level</Link>
        {characters && <Characters characters={characters}/> }
        <Score gameOver={gameOver} />
        {level && <Picture handleClick={handleClick} level={level}/>}
        {showDropdown && 
            <div className={styles.dropdown} style={{ left: mouseCoord.current[0], top: mouseCoord.current[1] }}>
                <Dropdown handleSelection={handleSelection} characters={characters} bounds={bounds.current} found={found} />
                <TargetSquare bounds={bounds}/>
            </div>
        }
        {characters && <Timer gameOver={gameOver} />}
        {found && <MarkFound found={found} bounds={bounds}/>}
    </>
  )
}

function Picture({handleClick, level}) {
    return (
        <img onClick={handleClick} className={styles.gameImage} src={level.picture.image} />
    )
}

function Characters({characters}) {
    const characterList = characters.map(character => {
        return (
            <li key={character.id} className={styles.character}>
                <p>{character.name} </p>
                <img src={character.image} />
            </li>
        )
    })

    return (
        <>
            <ul className={styles.characters}>
                <h3>Can you find: </h3>
                {characterList}
            </ul>
        </>
    )
}

function TargetSquare({bounds}) {
    return (
        <div className={styles.targetSquare} style={{ width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}></div>
    )
}

function MarkFound({found, bounds}) {
    return (
        found.map(char => {
            return < div key={char.id} className={styles.foundSquare} style={{ left: char.x_coord, top: char.y_coord, width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}></div >
        })
    )
}


export default Level
