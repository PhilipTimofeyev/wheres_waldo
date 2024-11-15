
import { React, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import ScoreModal from './ScoreModal';

function Score({ gameOver }) {
    const [userScore, setUserScore] = useState()
    const [scoreQuery, setScoreQuery] = useState()
    const { levelID } = useParams();

    const API_SCORES_URL = "http://127.0.0.1:3000/api/scores/"

    useEffect(() => {
        if (gameOver) {
            updateScore()
        } else {
            createScore()
        }
    }, [gameOver]);

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
            const response = await fetch(API_SCORES_URL, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setScoreQuery(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    } 

    const updateScore = async () => {
        const updateBody = {
            username: 'Anonymous',
        };

        const requestOptionsPatch = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        };

        try {
            const response = await fetch(`${API_SCORES_URL}${scoreQuery.id}`, requestOptionsPatch);
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
        <>
            {userScore && 
            <ScoreModal 
                gameOver={gameOver} 
                scoreQuery={scoreQuery} 
                userScore={userScore} 
                setUserScore={setUserScore}
            />
            }
        </>
    )

}

export default Score