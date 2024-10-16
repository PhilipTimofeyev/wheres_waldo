import { React, useState, useEffect } from 'react'

function ScoreForm({scoreID}) {
    const [data, setData] = useState(null);

    const updateScore = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        console.log(scoreID)

        const updateBody = {
            username: username,
        };


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
            // console.log(responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form method='post' onSubmit={updateScore}>
                <label htmlFor="username">Name: </label>
                <input type="text" name="username" id="userNameInputField" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            
        </div>
    )
}

export default ScoreForm
