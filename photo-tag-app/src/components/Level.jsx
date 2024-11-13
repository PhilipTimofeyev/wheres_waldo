import { React, useState, useEffect, useRef } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const SQUARE_SIZE = .015

function Level({level, setFound, found, setGameOver, gameOver}) {
    const [levelData, setLevelData] = useState();
    const [characters, setCharacters] = useState();
    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const bounds = useRef()

    useEffect(() => {
        const API_URL = `http://127.0.0.1:3000/api/pictures/${level.id}`
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
        const API_URL = `http://127.0.0.1:3000/api/characters/${level.id}`
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            setCharacters(data);
        };
        dataFetch();
    }, [levelData]);

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
          {/* { characters && <h1>Character(s) to find: {characterList} </h1> } */}
        {levelData && <Picture handleClick={handleClick} levelData={levelData}/>}
        {showDropdown && 
            <div className={styles.dropdown} style={{ left: mouseCoord[0], top: mouseCoord[1] }}>
                <Dropdown handleSelection={handleSelection} characters={characters} bounds={bounds.current} found={found} />
                <TargetSquare bounds={bounds}/>
            </div>
        }
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
