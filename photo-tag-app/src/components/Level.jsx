import { React, useState, useEffect, useRef } from 'react'
import { useParams, Link } from "react-router-dom";
import Dropdown from './Dropdown';
import Timer from './Timer';
import Score from './Score';
import styles from './MainGame.module.css'

const SQUARE_SIZE = .015

const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"


function Level() {
    const [levelData, setLevelData] = useState();
    const [characters, setCharacters] = useState();
    const [gameOver, setGameOver] = useState(false)
    const [mouseCoord, setMouseCoord] = useState()
    const [currentScore, setCurrentScore] = useState()
    const [found, setFound] = useState([])
    const [showDropdown, setShowDropdown] = useState(false); 
    const bounds = useRef()
    const { levelID } = useParams();

    useEffect(() => {
        const API_URL = `http://127.0.0.1:3000/api/pictures/${levelID}`
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            setLevelData(data);
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
            createScore()
        };
        dataFetch();
    }, [levelData]);

    async function createScore() {
        const postBody = {
            username: 'Anonymous',
            picture_id: levelID
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        };

        try {
            const response = await fetch(API_SCORE_URL, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setCurrentScore(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    } 

    function handleClick(e) {
        if (!gameOver) {
            setMouseCoord([e.clientX, e.clientY])
            showDropdown ? setShowDropdown(false) : setShowDropdown(true)
            bounds.current = e.target.getBoundingClientRect()
        }
    }

    function normalizeCharCoord(character) {
        // calculates ratio of character position relative to the image size
        const x_perc = character.x_coord / levelData.picture.image_width
        const y_perc = character.y_coord / levelData.picture.image_height

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

    function handleSelection(e) {
        const charName = e.target.innerText
        const charObj = levelData.characters.find(char => char.name === charName)

        const userCoord = normalizedUserCoord()
        const charCoord = normalizeCharCoord(charObj)

        // console.log(verifyCoord(userCoord, charCoord))
        if (verifyCoord(userCoord, charCoord)) {
            setFound([
                ...found, { name: charObj.name, id: charObj.id, x_coord: mouseCoord[0], y_coord: mouseCoord[1] }
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

    // const characterList = characters.map(character => {
    //         return (
    //             <li key={character.id} className={styles.character}>
    //                 <h5>{character.name} </h5>
    //                 <img src={character.image} />
    //             </li>
    //         )
    //     })


    useEffect(() => {
        endGame()
    }, [found]);

    function endGame() {
        let allFound
        if (levelData) {
            allFound = levelData.characters.length === found.length
        }
        if (allFound) {
            setGameOver(true)
            setShowDropdown(false)
        }
    }

  return (
    <>
          <Link to='/'>Select A Different Level</Link>
          {/* { characters && <h1>Character(s) to find: {characterList} </h1> } */}
        <Score gameOver={gameOver} scoreQuery={currentScore} />
        {levelData && <Picture handleClick={handleClick} levelData={levelData}/>}
        {showDropdown && 
            <div className={styles.dropdown} style={{ left: mouseCoord[0], top: mouseCoord[1] }}>
                <Dropdown handleSelection={handleSelection} characters={characters} bounds={bounds.current} found={found} />
                <TargetSquare bounds={bounds}/>
            </div>
        }
        <Timer gameOver={gameOver} />
        {found && <MarkFound found={found} bounds={bounds}/>}
    </>
  )
}

function Picture({handleClick, levelData}) {
    return (
        <img onClick={handleClick} className={styles.gameImage} src={levelData.picture.image} />
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
