
import { React, useState, useEffect } from 'react'
import ScoreForm from './ScoreForm';

function Score({startGame, endGame}) {
    const [data, setData] = useState(null);
    const [scoreID, setScoreID] = useState()
    const [duration, setDuration] = useState()


    const API_URL = "http://127.0.0.1:3000/api/scores"
    const UPDATE_URL = "http://127.0.0.1:3000/api/scores/1"
    
    const postBody = {
        username: 'test score',
        picture_id: 1
    };

    useEffect(() => {
        if (startGame) createScore()
        console.log("HMMM")
    }, []);

    useEffect(() => {
        if (endGame) updateScore()
    }, [endGame]);

    const createScore = async (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setScoreID(responseData.id)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updateBody = {
        username: 'update score',
    };

    const updateScore = async (event) => {
        console.log(scoreID)
        const requestOptionsPatch = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        };

        try {
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${scoreID}`, requestOptionsPatch);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setData(responseData);
            setDuration(responseData.duration)
            // console.log(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
        <h1>SCORE</h1>
        {/* {<button className='startBtn' onClick={updateScore}>Hmm</button>} */}
        {duration && <h1>Solved in {duration} seconds!</h1>}
        <ScoreForm scoreID={scoreID}/>
    </div>
  )

}

export default Score
