import { React, useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import styles from './MainGame.module.css'

const API_URL = "http://127.0.0.1:3000/api/pictures"

function getAPIData() {
    const [data, setData] = useState();

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            // set state when the data received
            setData(data);
        };

        dataFetch();
    }, []);

        
}

function MainGame() {

    const [mouseCoord, setMouseCoord] = useState()
    const [showDropdown, setShowDropdown] = useState(false); 
    const [showCircle, setShowCircle] = useState(false); 
    const [screenSize, setScreenSize] = useState(0)
    const [data, setData] = useState();

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    API_URL,
                )
            ).json();

            // set state when the data received
            setData(data);
        };

        dataFetch();
    }, []);

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

    // getAPIData()

  return (
    <div>
        {data && 
            <img className={styles.gameImage} onClick={handleClick}
            src={data[0].image}
            
        />
        }
          <div>{data && <h1>{data[0].title}</h1>}</div>
        {showDropdown &&
              <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: screenSize, height: screenSize }}><Dropdown characters={characters}/></div>}
        
        {showCircle && <div className={styles.targetSquare} style={{ left: mouseCoord[0], top: mouseCoord[1], width: screenSize, height: screenSize }}></div>}

    </div>
  )
}

export default MainGame
