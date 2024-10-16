
import { React, useState, useEffect } from 'react'

function Score({startGame}) {
    const [data, setData] = useState(null);
    const API_URL = "http://127.0.0.1:3000/api/scores"
    
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
        } catch (error) {
            console.error('Error:', error);
    }
}
  return (
    <div>
      <h1>SCORE</h1>
        {/* {<button className='startBtn' onClick={getApi}>Hmm</button>} */}
    </div>
  )
}

export default Score
