import { React, useState, useEffect, useRef } from 'react'
import { useParams, Link } from "react-router-dom";
import Dropdown from './Dropdown';
import Countdown from './Countdown';
import Characters from './Characters';
import Timer from './Timer';
import Score from '../Score/Score';
import styles from './Level.module.css'

const SQUARE_SIZE = .015

function Level() {
    const [level, setLevel] = useState();
    const [characters, setCharacters] = useState();
    const [startGame, setStartGame] = useState()
    const [gameOver, setGameOver] = useState(false)
    const [found, setFound] = useState([])
    const [showDropdown, setShowDropdown] = useState(false); 
    const [isShaking, setIsShaking] = useState(false);
    const mouseCoord = useRef()
    const { levelID } = useParams();
    const bounds = useRef()

    // Get Level Info
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

    // Get Characters Info
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

    function handleSelection(charID) {
        const charObj = level.characters.find(char => char.id === charID)

        const userCoord = normalizedUserCoord()
        const charCoord = normalizeCharCoord(charObj)

        if (verifyCoord(userCoord, charCoord)) {
            setFound([
                ...found, { name: charObj.name, id: charObj.id, x_coord: mouseCoord.current[0], y_coord: mouseCoord.current[1] }
            ])
        } else {
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500);
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
            if (characters.length === found.length) {
                setGameOver(true)
                setShowDropdown(false)
            }
        }
        if (characters) endGame()
    }, [found]);

  return (
    <div className={styles.mainContainer}>
        <div className={styles.navLink}>
            <Link to='/'>Select A Different Level</Link>
        </div>
        {startGame && <Score 
                        gameOver={gameOver} 
                      /> }
        {startGame && <Characters 
                        characters={characters}
                        found={found}
                        /> }
        {startGame && <Picture 
                            handleClick={handleClick} 
                            level={level}
                        />}
        {showDropdown && 
            <div className={styles.dropdown} style={{ left: mouseCoord.current[0], top: mouseCoord.current[1] }}>
                <Dropdown 
                    handleSelection={handleSelection} 
                    characters={characters} found={found} 
                    isShaking={isShaking} 
                />
                <TargetSquare 
                    bounds={bounds}
                />
            </div>
        }
        {startGame && <Timer gameOver={gameOver} />}
        {found && 
        <MarkFound 
            found={found} 
            bounds={bounds}
        />
    }
        <Countdown setStartGame={setStartGame}/>
    </div>
  )
}

function Picture({handleClick, level}) {
    return (
        <img 
            onClick={handleClick} 
            className={styles.gameImage} 
            src={level.picture.image} 
        />
    )
}

function TargetSquare({bounds}) {
    return (
        <div 
            className={styles.targetSquare} 
            style={{ width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}>                
        </div>
    )
}

function MarkFound({found, bounds}) {
    return (
        found.map(char => {
            return < div 
                key={char.id} 
                className={styles.foundSquare} 
                style={{ left: char.x_coord, top: char.y_coord, width: bounds.current.width * SQUARE_SIZE, height: bounds.current.width * SQUARE_SIZE, borderWidth: bounds.current.width * .003 }}>
            </div >
        })
    )
}

export default Level
