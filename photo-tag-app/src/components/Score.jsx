
import { React, useState, useEffect, useContext } from 'react'
import ScoreForm from './ScoreForm';
import { ScoreContext } from '../App';

function Score({startGame, gameOver}) {
    const [data, setData] = useState(null);
    const [allScores, setAllScores] = useState()
    const [userScore, setUserScore] = useState()
    const scoreQuery = useContext(ScoreContext)

    const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"
    const UPDATE_URL = "http://127.0.0.1:3000/api/scores/"

    useEffect(() => {
        if (gameOver) {
            updateScore()
        }
    }, [gameOver]);

    const updateScore = async () => {
        const updateBody = {
            username: '[Your Name]',
        };

        const requestOptionsPatch = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        };

        try {
            const response = await fetch(`${UPDATE_URL}${scoreQuery.id}`, requestOptionsPatch);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setUserScore(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
          {userScore && <ScoreForm gameOver={gameOver} scoreQuery={scoreQuery} userScore={userScore} setUserScore={setUserScore}/>}
    </div>
  )

}

export default Score
