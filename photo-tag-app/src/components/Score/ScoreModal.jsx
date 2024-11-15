import { React, useState, useEffect } from 'react'
import styles from './ScoreModal.module.css'
import Form from './Form.jsx'
import HighScores from './HighScores.jsx'

function ScoreModal({gameOver, scoreQuery, userScore, setUserScore}) {
    const [showModal, setShowModal] = useState()
    const [allScores, setAllScores] = useState(false)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        getAllScores()
    }, [gameOver, userScore])

    const getAllScores = async () => {
        const API_SCORE_URL = "http://127.0.0.1:3000/api/scores"

        try {
            const response = await fetch(`${API_SCORE_URL}?picture_id=${scoreQuery.picture_id}`)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            setAllScores(responseData)
            setShowModal(true)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const addHighScore = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')

        const updateBody = {
            username: username,
        };

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
            setUserScore(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Optional and created if needed
    const removeScore = async() => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/scores/${userScore.id}`, {method: 'DELETE'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            console.log(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function closeModal() {
        setShowModal(false)
    }

    function Modal() {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <HighScores 
                        allScores={allScores} 
                        userScore={userScore} 
                        setShowForm={setShowForm}
                    />
                    {showForm && 
                    <Form 
                        addHighScore={addHighScore}
                    />
                    }
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        )
    }

    return (
        <>
            {showModal && <Modal />}
        </>
    )
}

export default ScoreModal