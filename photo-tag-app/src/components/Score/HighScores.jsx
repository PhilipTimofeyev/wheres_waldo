import { React, useState, useEffect } from 'react'
import styles from './ScoreModal.module.css'

function HighScores({ allScores, userScore, setShowForm }) {

    const TOP_X_SCORES = 5

    const [isHighScore, setIsHighScore] = useState(false)
    const [isTopFive, setIsTopFive] = useState(false)

    function checkIfHighScore() {
        // Checks if score is top 5 or highest

        if (allScores.slice(0, 5).every(score => score.score > userScore.score)) {
            setShowForm(true)
            return setIsHighScore(true)
        }

        if (allScores.slice(0, 5).at(-1).score > userScore.score || allScores.length < 6) {
            setShowForm(true)
            return setIsTopFive(true)
        }
    }

    useEffect(() => {
        checkIfHighScore()
    }, [userScore])

    const topScores = allScores.slice(0, TOP_X_SCORES).map((score, idx) => {
        let color = ''
        // Colorize user's score
        if (score.id === userScore.id) color = 'red'
        return (
            <tbody key={score.id}>
                <tr style={{ color: color }}>
                    <td>{idx + 1}</td>
                    <td>{score.username}</td>
                    <td>{score.score}</td>
                </tr>
            </tbody>
        )
    }
    )

    return (
        <>
            {isHighScore && <h2>New High Score!</h2>}
            {isTopFive && <h2><u>You're in the Top Five!</u></h2>}
            <h3>You solved it in: <br />{userScore.score} seconds!</h3>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th><u>Rank</u></th>
                            <th><u>Username</u></th>
                            <th><u>Score (sec)</u></th>
                        </tr>
                    </thead>
                    {topScores}
                </table>
            </div>
        </>
    )
}

export default HighScores
