
import { React, useState, useEffect, useContext } from 'react'
import ScoreForm from './ScoreForm';
import { ScoreContext } from '../App';

function Score({startGame, gameOver}) {
    const [data, setData] = useState(null);
    const scoreQuery = useContext(ScoreContext)

    const API_URL = "http://127.0.0.1:3000/api/scores"
    const UPDATE_URL = "http://127.0.0.1:3000/api/scores/1"

    // useEffect(() => {
    //     createScore()
    // }, []);

    useEffect(() => {
        if (gameOver) updateScore()
    }, [gameOver]);

    // async function createScore() {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(postBody)
    //     };

    //     try {
    //         const response = await fetch(API_URL, requestOptions);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const responseData = await response.json();
    //         setScoreID(responseData.id)
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // } 


    const updateBody = {
        username: 'update score',
    };

    const updateScore = async () => {
        const requestOptionsPatch = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        };

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${scoreQuery.id}`, requestOptionsPatch);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
        {data && <h1>Solved in {data.score} seconds!</h1>}
        <ScoreForm gameOver={gameOver} scoreQuery={scoreQuery}/>
    </div>
  )

}

export default Score
