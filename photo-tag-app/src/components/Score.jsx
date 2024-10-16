
import { React, useState, useEffect } from 'react'

function Score({startGame}) {
    const [data, setData] = useState(null);
    const [scoreID, setScoreID] = useState()
    const API_URL = "http://127.0.0.1:3000/api/scores"
    const UPDATE_URL = "http://127.0.0.1:3000/api/scores/1"
    
    const postBody = {
        username: 'test score',
        picture_id: 1
    };

    useEffect(() => {
        createScore()
    }, [startGame]);

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
            setData(responseData);
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
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
      <h1>SCORE</h1>
        {<button className='startBtn' onClick={updateScore}>Hmm</button>}
    </div>
  )

}

export default Score
